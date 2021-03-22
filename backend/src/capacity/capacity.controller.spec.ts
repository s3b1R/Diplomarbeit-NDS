import { Test, TestingModule } from '@nestjs/testing';
import { CapacityController } from './capacity.controller';
import { CapacityService } from './capacity.service';
import { Capacity } from './capacity.entity';

jest.mock('../capacity/api.service.ts');

describe('CapacityController', () => {
  let capacityController: CapacityController;
  let capacityService: CapacityService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapacityController],
      providers: [CapacityService],
    }).compile();

    capacityService = module.get<CapacityService>(CapacityService);
    capacityController = module.get<CapacityController>(CapacityController);
  });

  it('should be defined', () => {
    expect(capacityController).toBeDefined();
  });

  it('should find all', async () => {
    const mockedValues = [new Capacity(), new Capacity(), new Capacity()];
    jest.spyOn(capacityService, 'findAll').mockResolvedValue(mockedValues);
    expect(await capacityController.index()).toHaveLength(3);
  });

  it('should find capacities by month', async () => {
    const mockedValues = [new Capacity(), new Capacity()];
    const mockedMonth = '2021-03';
    jest.spyOn(capacityService, 'findMonth').mockResolvedValue(mockedValues);
    expect(await capacityController.find(mockedMonth)).toHaveLength(2);
  });

  it('should find one by Id', async () => {
    const mockedValue = [new Capacity()];
    const mockedId = 99;
    jest.spyOn(capacityService, 'findById').mockResolvedValue(mockedValue);
    expect(await capacityController.findById(mockedId)).toHaveLength(1);
  });

  it('should create one', async () => {
    const mockedValue = {
      id: 1,
      capa: 0.8,
      date: new Date(2021, 3, 14),
      user: { id: 1, name: 'Hans Muster', capacity: [] },
    };
    const mockedCapacity = new Capacity();
    jest.spyOn(capacityService, 'create').mockResolvedValue(mockedValue);
    expect(await capacityController.create(mockedCapacity)).toBe(mockedValue);
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
    const mockedID = 99;
    const mockedBody = new Capacity();
    jest.spyOn(capacityService, 'update').mockResolvedValue(mockedValues);
    expect(await capacityController.update(mockedID, mockedBody)).toBe(
      mockedValues,
    );
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
    const mockedID = 123;
    jest.spyOn(capacityService, 'delete').mockResolvedValue(mockedValues);
    expect(await capacityController.delete(mockedID)).toBe(mockedValues);
  });
});
