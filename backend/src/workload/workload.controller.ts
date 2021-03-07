import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { Workload } from './workload.entity';
import { WorkloadService } from './workload.service';

@Controller('workload')
export class WorkloadController {
  constructor(private workloadService: WorkloadService) {}

  @Get()
  index(): Promise<Workload[]> {
    return this.workloadService.findAll();
  }

  @Post('create')
  async create(@Body() workload: Workload): Promise<any> {
    return this.workloadService.create(workload);
  }

  @Delete('delete')
  async clear(): Promise<void> {
    return this.workloadService.clear();
  }
}
