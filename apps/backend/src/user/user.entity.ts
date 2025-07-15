import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Strategy } from '../strategy/strategy.entity';

export enum UserRole {
  ADMIN = 'admin',
  TRADER = 'trader',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telegramChatId: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TRADER,
  })
  role: UserRole;

  @Column({ nullable: true })
  dhan_access_token: string;

  @OneToMany(() => Strategy, strategy => strategy.user)
  strategies: Strategy[];
}
