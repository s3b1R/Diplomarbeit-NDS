import { Module } from '@nestjs/common';
import { PiService } from './pi.service';
import { PiController } from './pi.controller';

@Module({
  controllers: [PiController],
  providers: [PiService]
})
export class PiModule {}
