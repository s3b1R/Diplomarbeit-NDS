import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  index(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<Users[]> {
    return this.usersService.findById(id);
  }

  @Post('create')
  async create(@Body() usersData: Users): Promise<any> {
    return this.usersService.create(usersData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() usersData: Users): Promise<any> {
    usersData.id = Number(id);
    return this.usersService.update(usersData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.usersService.delete(id);
  }
}
