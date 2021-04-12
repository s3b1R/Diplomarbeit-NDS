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

  @Get('storypoints')
  async getStoryPointsForUserInSprint(
    @Body('name') name,
    @Body('sprint') sprint,
  ): Promise<number> {
    return this.workloadService.getStoryPointsForUserInSprint(name, sprint);
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
