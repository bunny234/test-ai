import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password_hash = await bcrypt.hash(user.password_hash, salt);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
