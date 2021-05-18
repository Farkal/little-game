import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository, USER_REPOSITORY } from '../user.repository';
import { AuthException } from '@core/exceptions';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_OR_ROUND } from '../../../config/main';

@Injectable()
export class CreateUserInteractor {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository, // private readonly createTokenInteractor,
  ) {}

  async create(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_OR_ROUND);
    let user = new User({ username, hashedPassword });
    user = await this.userRepo.create(user);
    return user;
  }
}
