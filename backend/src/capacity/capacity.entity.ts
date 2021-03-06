import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Capacity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 2, scale: 1 })
  capa: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => Users, (user: Users) => user.capacity)
  public user: Users;
}
