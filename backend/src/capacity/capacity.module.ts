import { Module } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capacity } from './capacity.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Capacity]),
  ],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
