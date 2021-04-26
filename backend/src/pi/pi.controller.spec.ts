import { Test, TestingModule } from '@nestjs/testing';
import { PiController } from './pi.controller';
import { PiService } from './pi.service';
import { Pi } from './pi.entity';

jest.mock('../pi/pi.service.ts');

describe('PiController', () => {
  let piController: PiController;
  let piService: PiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiController],
      providers: [PiService],
    }).compile();

    piController = module.get<PiController>(PiController);
    piService = module.get<PiService>(PiService);
  });

  it('should be defined', () => {
    expect(piController).toBeDefined();
  });

  it('should find all', async () => {
    const mockedValues = [new Pi(), new Pi(), new Pi()];
    jest.spyOn(piService, 'findAll').mockResolvedValue(mockedValues);
    expect(await piController.index()).toHaveLength(3);
  });

  it('should find one by id', async () => {
    const mockedValues = [new Pi()];
    const mockedID = 99;
    jest.spyOn(piService, 'findById').mockResolvedValue(mockedValues);
    expect(await piController.findById(mockedID)).toHaveLength(1);
  });

  it('should create one', async () => {
    const mockedValues = {
      piShortname: '2103',
      piStart: new Date(2021, 3, 1),
      piEnd: new Date(2021, 5, 9),
      sprintCounts: 5,
      sprint1Start: new Date(),
      sprint1End: new Date(),
      sprint2Start: new Date(),
      sprint2End: new Date(),
      sprint3Start: new Date(),
      sprint3End: new Date(),
      sprint4Start: new Date(),
      sprint4End: new Date(),
      sprint5Start: new Date(),
      sprint5End: new Date(),
      sprint6Start: null,
      sprint6End: null,
      id: 1,
    };
    const mockedPi = new Pi();
    jest.spyOn(piService, 'create').mockResolvedValue(mockedValues);
    expect(await piController.create(mockedPi)).toBe(mockedValues);
  });

  it('should update one', async () => {
    const mockedValues = {
      generatedMaps: [],
      raw: {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        protocol41: true,
        changedRows: 1,
      },
      affected: 1,
    };
    const mockedID = 88;
    const mockedBody = new Pi();
    jest.spyOn(piService, 'update').mockResolvedValue(mockedValues);
    expect(await piController.update(mockedID, mockedBody)).toBe(mockedValues);
  });

  it('should delete one', async () => {
    const mockedValues = {
      raw: {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0,
      },
      affected: 1,
    };
    const mockedID = 1;
    jest.spyOn(piService, 'delete').mockResolvedValue(mockedValues);
    expect(await piController.delete(mockedID)).toBe(mockedValues);
  });

});
