import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import any = jasmine.any;

@Entity()
export class Workload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assignee: string;

  @Column()
  sprint: string;

  @Column('decimal', { precision: 2, scale: 1 })
  storyPoints: number;

  @Column()
  project: string;
}
