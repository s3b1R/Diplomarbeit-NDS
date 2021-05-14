import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Workload } from './workload.entity';
import { WorkloadService } from './workload.service';

@Controller('workload')
export class WorkloadController {
  constructor(private workloadService: WorkloadService) {}

  @Get()
  index(): Promise<Workload[]> {
    return this.workloadService.findAll();
  }

  @Get(':name/:sprint/storypoints')
  async getWorkloadForUserInSprint(
    @Param('name') name,
    @Param('sprint') sprint,
  ): Promise<any> {
    return this.workloadService.getWorkloadForUserInSprint(name, sprint);
  }

  @Post('create')
  async create(@Body() workload: Workload): Promise<any> {
    return this.workloadService.create(workload);
  }

  @Delete('clear')
  async clear(): Promise<void> {
    return this.workloadService.clear();
  }
}
