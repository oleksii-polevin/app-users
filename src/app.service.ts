import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(count: number): Promise<IUser> {
    const createdUser = await new this.userModel(count).save();
    return createdUser;
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId): Promise<IUser> {
    return this.userModel.findById(userId).exec();
  }

  async updateOrCreate(userId: string, count) {
    const user = await this.userModel.findById(userId);
    if (user) {
      return this.userModel.findOneAndUpdate({_id: userId }, count);
    }
    this.create(count);
  }
}
