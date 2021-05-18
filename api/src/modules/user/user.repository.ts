import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserOrm } from './user.orm';
import { UserMapper } from './user.mapper';
import { NotFoundException } from '@core/exceptions';

export const USER_REPOSITORY = 'USER REPOSITORY';
export interface UserRepository {
  search(filters: string): Promise<User[]>;
  readByUsername(username: string): Promise<User>;
  create(user: User): Promise<User>;
}

export class UserDatabaseRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrm) private usersRepository: Repository<UserOrm>,
  ) {
    this.mapper = new UserMapper();
  }

  private readonly mapper: UserMapper;

  async search(filters: string) {
    const users = await this.usersRepository.find();
    return users.map((u) => this.mapper.toDomain(u));
  }

  async readByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return this.mapper.toDomain(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async create(user: User) {
    let userOrm = this.mapper.toOrm(user);
    userOrm = await this.usersRepository.save(userOrm);
    return this.mapper.toDomain(userOrm);
  }
}
