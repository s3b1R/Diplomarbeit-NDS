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

  @Get(':date/:id')
  async findDateAndUser(
    @Param('date') date,
    @Param('id') id,
  ): Promise<Capacity[]> {
    return this.capacityService.findDateAndUser(date, id);
  }

  @Get(':id/:start/:end/capa')
  async getCapacityForUserInSprint(
    @Param('id') id,
    @Param('start') start,
    @Param('end') end,
  ): Promise<any> {
    return this.capacityService.getCapacityForUserInSprint(id, start, end);
  }

  @Post('create')
  async create(@Body() capacityData: Capacity): Promise<any> {
    return this.capacityService.create(capacityData);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() capacityData: Capacity): Promise<any> {
    capacityData.id = Number(id);
    return this.capacityService.update(capacityData);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.capacityService.delete(id);
  }

  @Delete('all/:userId')
  async deleteAllCapacityForUser(@Param('userId') userId): Promise<any> {
    return this.capacityService.deleteAllCapacityForUser(userId);
  }
}
