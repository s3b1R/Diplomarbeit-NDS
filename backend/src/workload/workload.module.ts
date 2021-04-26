import { Module } from '@nestjs/common';
import { WorkloadService } from './workload.service';
import { WorkloadController } from './workload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workload } from './workload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workload])],
  providers: [WorkloadService],
  controllers: [WorkloadController],
})
export class WorkloadModule {}
