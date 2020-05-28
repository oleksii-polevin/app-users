import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId): Promise<IUser> {
    return this.userModel.findOne({ userId });
  }

  async updateOrCreate(userId, count) {
    const user = await this.findOne(userId);
    if (user) {
      const filter = { userId };
      const update = { count }
      return this.userModel.findOneAndUpdate(filter, update, {
        new: true
      })
    }
    this.create({ userId, count })
  }
}
