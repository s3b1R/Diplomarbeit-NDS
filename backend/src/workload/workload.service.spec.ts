import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkloadService } from './workload.service';
import { Workload } from './workload.entity';

describe('WorkloadService', () => {
  let workloadService: WorkloadService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkloadService,
        { provide: getRepositoryToken(Workload), useClass: mockRepository },
      ],
    }).compile();

    workloadService = module.get<WorkloadService>(WorkloadService);
  });

  it('should be defined', () => {
    expect(workloadService).toBeDefined();
  });

  it('should find all workloads', async () => {
    const workloadsFromDB: Workload[] = await workloadService.findAll();

    expect(workloadsFromDB).toHaveLength(3);
    expect(workloadsFromDB[0].id).toBe(1);
    expect(workloadsFromDB[1].storyPoints).toBe('0.8');
  });

  it('should return sum of storypoints from a user', async () => {
    const workloadSumFromDB: any = await workloadService.getStoryPointsForUserInSprint(
      'name',
      'sprint',
    );
    expect(workloadSumFromDB.sum).toBe(3.5);
  });

  it('should create one', async () => {
    const newWorkload: Workload = await workloadService.create(new Workload());

    expect(newWorkload).toBeInstanceOf(Workload);
  });

  it('should clear table', async () => {
    const deleteResult = await workloadService.clear();
    expect(deleteResult).toBeUndefined();
    expect(mockRepository).toHaveBeenCalledTimes(1);
    expect(mockRepository).toHaveBeenCalledWith();
  });
});

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 1,
          assignee: 'Hanna Muster',
          sprint: 'Unit 2101-5 (23.12.-5.1.)',
          storyPoints: '1.0',
          project: 'Unit Test',
        },
        {
          id: 2,
          assignee: 'Hans Muster',
          sprint: 'Unit 2101-5 (23.12.-5.1.)',
          storyPoints: '0.8',
          project: 'Unit Test',
        },
        {
          id: 3,
          assignee: 'Peter Muster',
          sprint: 'Unit 2101-5 (23.12.-5.1.)',
          storyPoints: '1.0',
          project: 'Unit Test',
        },
      ]);
    }),
  save: () =>
    new Promise((resolve) => {
      resolve(new Workload());
    }),
  clear: () => undefined,
  createQueryBuilder: () => ({
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnValueOnce({
      sum: 3.5,
    }),
  }),
}));
