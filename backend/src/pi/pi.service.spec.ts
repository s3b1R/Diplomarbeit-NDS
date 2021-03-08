import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PiService } from './pi.service';
import { Pi } from './pi.entity';

describe('PiService', () => {
  let piService: PiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PiService,
        {
          provide: getRepositoryToken(Pi),
          useClass: mockRepository,
        },
      ],
    }).compile();

    piService = module.get<PiService>(PiService);
  });

  it('should be defined', () => {
    expect(piService).toBeDefined();
  });

  it('should find all pi', async () => {
    const piFromDB: Pi[] = await piService.findAll();

    expect(piFromDB).toHaveLength(3);
    expect(piFromDB[0].id).toBe(1);
    expect(piFromDB[2].piShortname).toBe('2107');
  });

  it('should find one by id', async () => {
    const placeholderId = 99;
    const piFromDB: Pi[] = await piService.findById(placeholderId);

    expect(Array.isArray(piFromDB)).toBeTruthy();
    expect(piFromDB[0].id).toBe(2);
    expect(piFromDB[0].piShortname).toBe('2105');
  });

  it('should create one', async () => {
    const newPi: Pi = await piService.create(new Pi());

    expect(newPi).toBeInstanceOf(Pi);
  });

  it('should update one', async () => {
    const updateResult = await piService.update(new Pi());

    expect(updateResult).toHaveProperty('raw.changedRows', 1);
    expect(updateResult).toHaveProperty('affected', 1);
  });

  it('should delete one', async () => {
    const placeholderID = 99;
    const deleteResult = await piService.delete(placeholderID);

    expect(deleteResult).toHaveProperty('raw.changedRows', 0);
    expect(deleteResult).toHaveProperty('affected', 1);
  });
});

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 1,
          piShortname: '2103',
          piStart: '2021-01-06',
          piEnd: '2021-03-01',
          sprintCounts: '5',
        },
        {
          id: 2,
          piShortname: '2105',
          piStart: '2021-03-06',
          piEnd: '2021-05-01',
          sprintCounts: '5',
        },
        {
          id: 3,
          piShortname: '2107',
          piStart: '2021-05-06',
          piEnd: '2021-07-01',
          sprintCounts: '5',
        },
      ]);
    }),
  findByIds: () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 2,
          piShortname: '2105',
          piStart: '2021-03-06',
          piEnd: '2021-05-01',
          sprintCounts: '5',
        },
      ]);
    }),
  save: () =>
    new Promise((resolve) => {
      resolve(new Pi());
    }),
  update: () =>
    new Promise((resolve) => {
      resolve({
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
      });
    }),
  delete: () =>
    new Promise((resolve) => {
      resolve({
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
      });
    }),
}));
