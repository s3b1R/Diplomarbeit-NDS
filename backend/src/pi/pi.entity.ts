import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  piShortname: string;

  @Column('date')
  piStart: Date;

  @Column('date')
  piEnd: Date;

  @Column()
  sprintCounts: number;
}
