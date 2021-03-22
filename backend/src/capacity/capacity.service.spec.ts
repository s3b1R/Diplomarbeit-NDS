import { Test, TestingModule } from '@nestjs/testing';
import { CapacityService } from './capacity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Capacity } from './capacity.entity';

describe('CapacityService', () => {
  let capacityService: CapacityService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CapacityService,
        {
          provide: getRepositoryToken(Capacity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    capacityService = module.get<CapacityService>(CapacityService);
  });

  it('should be defined', () => {
    expect(capacityService).toBeDefined();
  });

  it('should find all capacities', async () => {
    const capacitiesFromDB: Capacity[] = await capacityService.findAll();

    expect(capacitiesFromDB).toHaveLength(3);
    expect(capacitiesFromDB[0].id).toBe(1);
    expect(capacitiesFromDB[1].user.id).toBe(2);
  });

  it('should find capacities by month', async () => {
    const placeholderString = 'placholder';
    const monthCapacitiesFromDB: Capacity[] = await capacityService.findMonth(
      placeholderString,
    );

    expect(monthCapacitiesFromDB).toHaveLength(3);
    expect(monthCapacitiesFromDB[0].id).toBe(1);
    expect(monthCapacitiesFromDB[1].user.id).toBe(2);
  });

  it('should find by id', async () => {
    const placeholderId = 999;
    const capacityFromDB: Capacity[] = await capacityService.findById(
      placeholderId,
    );

    expect(Array.isArray(capacityFromDB)).toBeTruthy();
    expect(capacityFromDB[0].id).toBe(1);
    expect(capacityFromDB[0].capa).toBe('0.8');
  });

  it('should create one', async () => {
    const newCapacity = await capacityService.create(new Capacity());

    expect(newCapacity).toBeInstanceOf(Capacity);
  });

  it('should update one', async () => {
    const updateCapacity = await capacityService.update(new Capacity());

    expect(updateCapacity).toHaveProperty('raw.changedRows', 1);
    expect(updateCapacity).toHaveProperty('affected', 1);
  });

  it('should delete one', async () => {
    const placeholderID = 99;
    const deleteCapacity = await capacityService.delete(placeholderID);

    expect(deleteCapacity).toHaveProperty('raw.changedRows', 0);
    expect(deleteCapacity).toHaveProperty('affected', 1);
  });
});

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 1,
          capa: '0.8',
          date: '2021-04-12',
          user: { id: 1, name: 'Hans Muster' },
        },
        {
          id: 2,
          capa: '0.8',
          date: '2021-04-13',
          user: { id: 2, name: 'Sebastian Rüegg' },
        },
        {
          id: 3,
          capa: '1.0',
          date: '2021-04-13',
          user: { id: 3, name: 'Peter Lustig' },
        },
      ]);
    }),
  findByIds: () =>
    new Promise((resolve) => {
      resolve([{ id: 1, capa: '0.8', date: '2021-04-12' }]);
    }),
  save: () =>
    new Promise((resolve) => {
      resolve(new Capacity());
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
