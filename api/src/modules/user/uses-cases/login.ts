import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository, USER_REPOSITORY } from '../user.repository';
import { AuthException } from '@core/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '@core/auth';

@Injectable()
export class LoginUserInteractor {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private jwtService: JwtService, // private readonly createTokenInteractor,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.readByUsername(username); // TODO: throw user not found
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (valid) {
      const payload = new UserPayload(user.id.value, user.username);
      return this.jwtService.sign(Object.assign({}, payload));
    } else {
      throw new AuthException('Invalid credential');
    }
  }
}
