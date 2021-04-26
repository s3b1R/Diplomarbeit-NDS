import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pi } from './pi.entity';

@Injectable()
export class PiService {
  constructor(
    @InjectRepository(Pi)
    private piRepository: Repository<Pi>,
  ) {}

  async create(pi: Pi): Promise<Pi> {
    return await this.piRepository.save(pi);
  }

  async findAll(): Promise<Pi[]> {
    return await this.piRepository.find({
      order: { piShortname: 'DESC' },
    });
  }

  async findById(id): Promise<Pi[]> {
    return await this.piRepository.findByIds(id);
  }

  async update(pi: Pi): Promise<UpdateResult> {
    return await this.piRepository.update(pi.id, pi);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.piRepository.delete(id);
  }
}
