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

  @Column({ type: 'date', nullable: true, default: null})
  sprint1Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint1End: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint2Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint2End: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint3Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint3End: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint4Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint4End: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint5Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint5End: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint6Start: Date;

  @Column({ type: 'date', nullable: true, default: null})
  sprint6End: Date;
}
