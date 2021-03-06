import { Test, TestingModule } from '@nestjs/testing';
import { WorkloadController } from './workload.controller';
import { WorkloadService } from './workload.service';
import { Workload } from './workload.entity';

jest.mock('../workload/workload.service.ts');

describe('WorkloadController', () => {
  let workloadController: WorkloadController;
  let workloadService: WorkloadService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkloadController],
      providers: [WorkloadService],
    }).compile();

    workloadController = module.get<WorkloadController>(WorkloadController);
    workloadService = module.get<WorkloadService>(WorkloadService);
  });

  it('should be defined', async () => {
    expect(workloadController).toBeDefined();
  });

  it('should find all', async () => {
    const mockedValues = [new Workload(), new Workload(), new Workload()];
    jest.spyOn(workloadService, 'findAll').mockResolvedValue(mockedValues);
    expect(await workloadController.index()).toHaveLength(3);
  });

  it('should return sum of workload from a user', async () => {
    const mockedWorkload = { sum: 2.5 };
    jest
      .spyOn(workloadService, 'getWorkloadForUserInSprint')
      .mockResolvedValue(mockedWorkload);
    expect(
      await workloadController.getWorkloadForUserInSprint('Name', 'Sprint'),
    ).toBe(mockedWorkload);
  });

  it('should create one', async () => {
    const mockedEntity = new Workload();
    const mockedInput = new Workload();
    jest.spyOn(workloadService, 'create').mockResolvedValue(mockedEntity);
    expect(await workloadController.create(mockedInput)).toBe(mockedEntity);
  });

  it('should delete all', async () => {
    jest.spyOn(workloadService, 'clear');
    expect(await workloadController.clear()).toBeUndefined();
  });
});
