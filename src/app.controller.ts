import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Update existing user or create new user with params: userId and count
   * @param id UserId
   * @param headers Http Headers
   */
  @Get('user/:id')
  async update(@Param('id') id: string, @Headers() headers) {
    return this.appService.updateOrCreate(id, headers['count']);

  }

  /**
   * Shows all users
   */
  @Get('users')
  async findAll(): Promise<IUser[]> {
    return this.appService.findAll();
  }

  /**
   * Show user with specific id
   * @param id userUd
   */
  @Get('users/:id')
  async findOne(@Param('id') id: string): Promise<IUser> {
    return this.appService.findOne(id);
  }

  @Post('users')
  async create(@Headers() headers) {
    const userId = headers['userid'];
    const count = headers['count'];
    console.log(headers)
    const createUserDto: CreateUserDto = {
      userId,
      count,
    }
    await this.appService.create(createUserDto);
  }

}
