import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Capacity } from './capacity.entity';

@Injectable()
export class CapacityService {
  constructor(
    @InjectRepository(Capacity)
    private capacityRepository: Repository<Capacity>,
  ) {}

  async findAll(): Promise<Capacity[]> {
    return await this.capacityRepository.find({ relations: ['user'] });
  }

  async create(capacity: Capacity): Promise<Capacity> {
    return await this.capacityRepository.save(capacity);
  }

  async findById(id): Promise<Capacity[]> {
    return await this.capacityRepository.findByIds(id);
  }

  async update(capacity: Capacity): Promise<UpdateResult> {
    return await this.capacityRepository.update(capacity.id, capacity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.capacityRepository.delete(id);
  }

  async findMonth(month: string): Promise<Capacity[]> {
    return await this.capacityRepository.find({
      relations: ['user'],
      where: `date like "${month}%"`,
    });
  }
}
