import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';

jest.mock('../users/users.service.ts');

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should find all', async () => {
    const mockedValues = [new Users(), new Users(), new Users(), new Users()];
    jest.spyOn(userService, 'findAll').mockResolvedValue(mockedValues);
    expect(await userController.index()).toHaveLength(4);
  });

  it('should find one by Id', async () => {
    const mockedValues = [new Users()];
    const mockedId = 1;
    jest.spyOn(userService, 'findById').mockResolvedValue(mockedValues);
    expect(await userController.findById(mockedId)).toHaveLength(1);
  });

  it('should create one', async () => {
    const mockedValues = { name: 'Susi Test', id: 1, capacity: [] };
    const mockedUser = new Users();
    jest.spyOn(userService, 'create').mockResolvedValue(mockedValues);
    expect(await userController.create(mockedUser)).toBe(mockedValues);
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
    const mockedID = 1;
    const mockedBody = new Users();
    jest.spyOn(userService, 'update').mockResolvedValue(mockedValues);
    expect(await userController.update(mockedID, mockedBody)).toBe(
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
    const mockedID = 1;
    jest.spyOn(userService, 'delete').mockResolvedValue(mockedValues);
    expect(await userController.delete(mockedID)).toBe(mockedValues);
  });
});
