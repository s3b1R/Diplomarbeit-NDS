import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PiService } from './pi.service';
import { Pi } from './pi.entity';
import {UpdateResult} from "typeorm";

@Controller('pi')
export class PiController {
  constructor(private piService: PiService) {}

  @Post('create')
  async create(@Body() piData: Pi): Promise<any> {
    return this.piService.create(piData);
  }

  @Get()
  index(): Promise<Pi[]> {
    return this.piService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id): Promise<Pi[]> {
    return this.piService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() piData: Pi): Promise<any> {
    piData.id = Number(id);
    return this.piService.update(piData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.piService.delete(id);
  }
}
