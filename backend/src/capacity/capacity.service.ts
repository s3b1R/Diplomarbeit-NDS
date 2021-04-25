import { Injectable } from '@nestjs/common';
import { DeleteResult, getManager, Repository, UpdateResult } from 'typeorm';
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
      order: { user: 'ASC' },
    });
  }

  async findDateAndUser(date: string, id: number): Promise<Capacity[]> {
    return await this.capacityRepository.find({
      relations: ['user'],
      where: `date = "${date}" and userID = "${id}"`,
    });
  }

  async getCapacityForUserInSprint(
    id: number,
    start: string,
    end: string,
  ): Promise<any> {
    const manager = getManager();
    return await manager.query(
      `select SUM(capa) as capasum from capacity where userId = '${id}' and  date between '${start}' and '${end}';`,
    );
  }

  async deleteAllCapacityForUser(userId: number): Promise<any> {
    const manager = getManager();
    return await manager.query(
      `delete from capacity where userId = '${userId}';`,
    );
  }
}
