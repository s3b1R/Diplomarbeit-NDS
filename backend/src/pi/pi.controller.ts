import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PiService } from './pi.service';
import { CreatePiDto } from './dto/create-pi.dto';
import { UpdatePiDto } from './dto/update-pi.dto';

@Controller('pi')
export class PiController {
  constructor(private readonly piService: PiService) {}

  @Post()
  create(@Body() createPiDto: CreatePiDto) {
    return this.piService.create(createPiDto);
  }

  @Get()
  findAll() {
    return this.piService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePiDto: UpdatePiDto) {
    return this.piService.update(+id, updatePiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piService.remove(+id);
  }
}
