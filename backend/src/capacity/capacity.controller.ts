import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { Capacity } from './capacity.entity';

@Controller('capacity')
export class CapacityController {
  constructor(private capacityService: CapacityService) {}

  @Get()
  index(): Promise<Capacity[]> {
    return this.capacityService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<Capacity[]> {
    return this.capacityService.findById(id);
  }

  @Get('month/:month')
  async find(@Param('month') month): Promise<Capacity[]> {
    return this.capacityService.findMonth(month);
  }

  @Post('create')
  async create(@Body() capacityData: Capacity): Promise<any> {
    return this.capacityService.create(capacityData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() capacityData: Capacity): Promise<any> {
    capacityData.id = Number(id);
    return this.capacityService.update(capacityData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.capacityService.delete(id);
  }
}
