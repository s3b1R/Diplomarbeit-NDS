import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workload } from './workload.entity';

@Injectable()
export class WorkloadService {
  constructor(
    @InjectRepository(Workload)
    private workloadRepository: Repository<Workload>,
  ) {}

  async findAll(): Promise<Workload[]> {
    return await this.workloadRepository.find({
      order: {
        project: 'ASC',
        sprint: 'ASC',
        assignee: 'ASC',
      },
    });
  }

  async getWorkloadForUserInSprint(
    name: string,
    sprint: string,
  ): Promise<any> {
    return await this.workloadRepository
      .createQueryBuilder('workload')
      .select('SUM(workload.storyPoints)', 'sum')
      .where(`workload.assignee = "${name}"`)
      .andWhere(`workload.sprint LIKE "%${sprint}%"`)
      .getRawOne();
  }

  async create(workload: Workload): Promise<Workload> {
    return await this.workloadRepository.save(workload);
  }

  async clear(): Promise<void> {
    return await this.workloadRepository.clear();
  }
}
