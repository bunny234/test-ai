import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Strategy } from '../strategy/strategy.entity';

export enum TradeSide {
  BUY = 'buy',
  SELL = 'sell',
}

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Strategy)
  strategy: Strategy;

  @Column()
  symbol: string;

  @Column({
    type: 'enum',
    enum: TradeSide,
  })
  side: TradeSide;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  entry_price: number;

  @Column('decimal', { nullable: true })
  exit_price: number;

  @CreateDateColumn()
  entry_time: Date;

  @Column({ nullable: true })
  exit_time: Date;

  @Column('decimal', { nullable: true })
  pnl: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
