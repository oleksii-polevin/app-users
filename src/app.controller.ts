import { Controller, Get, Post, Param, Headers, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { IUser } from './interfaces/user.interface';

const SECRET = 'INSERT HERE';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Update existing user or create new user with params: userId and count
   * @param id UserId
   * @param headers Http Headers
   */
  @Put('user/:id')
  async update(@Param('id') id: string, @Headers() headers, @Body() count) {
    if (headers['app'] === SECRET) {
    return this.appService.updateOrCreate(id, count);
    }
  }

  /**
   * Shows all users
   */
  @Get('users')
  async findAll(@Headers() headers): Promise<IUser[]> {
    if (headers['api'] === SECRET) {
      return this.appService.findAll();
    }
  }

  /**
   * Show user with specific id
   * @param id userUd
   */
  @Get('users/:id')
  async findOne(@Param('id') id: string, @Headers() headers): Promise<IUser> {
    if (headers['app'] === SECRET) {
      return this.appService.findOne(id);
    }
    
  }

  /**
   * Create new user 
   * @param count Count
   * @param headers http-headers
   */
  @Post('users')
  async create(@Body() count: number, @Headers() headers) {
    if (headers['app'] === SECRET) {
      await this.appService.create(count);
    }
  }
}
