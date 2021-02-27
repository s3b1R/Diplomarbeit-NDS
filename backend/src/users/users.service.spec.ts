import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './users.entity';

export const mockRepository = jest.fn(() => ({
  find: () =>
    new Promise((resolve) => {
      resolve([{ id: 1, name: 'Hans Muster' }]);
    }),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can find all users', async () => {
    const usersFromDB: Users[] = await service.findAll();

    expect(Array.isArray(usersFromDB)).toBeTruthy();
    expect(usersFromDB[0].id).toBe(1);
    expect(usersFromDB[0].name).toBe('Hans Muster');
  });
});
