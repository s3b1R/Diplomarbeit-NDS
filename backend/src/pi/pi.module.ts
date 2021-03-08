import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiService } from './pi.service';
import { PiController } from './pi.controller';
import { Pi } from './pi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pi])],
  controllers: [PiController],
  providers: [PiService],
})
export class PiModule {}
