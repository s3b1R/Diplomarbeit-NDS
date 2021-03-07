import { Test, TestingModule } from '@nestjs/testing';
import { PiController } from './pi.controller';
import { PiService } from './pi.service';

describe('PiController', () => {
  let controller: PiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiController],
      providers: [PiService],
    }).compile();

    controller = module.get<PiController>(PiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
