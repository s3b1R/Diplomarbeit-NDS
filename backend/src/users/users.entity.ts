import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Capacity } from '../capacity/capacity.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Capacity, (capacity: Capacity) => capacity.user)
  public capacity: Capacity[];
}
