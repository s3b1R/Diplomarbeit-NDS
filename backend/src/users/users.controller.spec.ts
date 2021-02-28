import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
jest.mock('../users/users.service.ts');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find one by Id', async () => {
    const expectedResult = [{ id: 1, name: 'Hans Muster' }];
    const mockNumberToSatisfyParameters = 1;
    jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
    expect(await controller.findById(mockNumberToSatisfyParameters)).toBe(
      expectedResult,
    );
  });
});
