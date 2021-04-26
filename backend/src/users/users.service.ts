import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findById(id): Promise<Users[]> {
    return await this.usersRepository.findByIds(id);
  }

  async create(users: Users): Promise<Users> {
    return await this.usersRepository.save(users);
  }

  async update(users: Users): Promise<UpdateResult> {
    return await this.usersRepository.update(users.id, users);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
