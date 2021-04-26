import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './users.entity';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: mockRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should find all users', async () => {
    const usersFromDB: Users[] = await usersService.findAll();

    expect(usersFromDB).toHaveLength(5);
    expect(usersFromDB[0].id).toBe(1);
    expect(usersFromDB[2].name).toBe('Peter Lustig');
  });

  it('should find by id', async () => {
    const placeholderId = 1;
    const userFromDB: Users[] = await usersService.findById(placeholderId);

    expect(Array.isArray(userFromDB)).toBeTruthy();
    expect(userFromDB[0].id).toBe(2);
    expect(userFromDB[0].name).toBe('Sebastian Rüegg');
  });

  it('should create one', async () => {
    const newUser: Users = await usersService.create(new Users());

    expect(newUser).toBeInstanceOf(Users);
  });

  it('should update one', async () => {
    const updateResult = await usersService.update(new Users());

    expect(updateResult).toHaveProperty('raw.changedRows', 1);
    expect(updateResult).toHaveProperty('affected', 1);
  });

  it('should delete one', async () => {
    const placeholderID = 1;
    const deleteResult = await usersService.delete(placeholderID);

    expect(deleteResult).toHaveProperty('raw.changedRows', 0);
    expect(deleteResult).toHaveProperty('affected', 1);
  });
});

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve) => {
      resolve([
        { id: 1, name: 'Hans Muster' },
        { id: 2, name: 'Sebastian Rüegg' },
        { id: 3, name: 'Peter Lustig' },
        { id: 4, name: 'Peter Müller' },
        { id: 6, name: 'Gundula Gause' },
      ]);
    }),
  findByIds: () =>
    new Promise((resolve) => {
      resolve([{ id: 2, name: 'Sebastian Rüegg' }]);
    }),
  save: () =>
    new Promise((resolve) => {
      resolve(new Users());
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
