import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository, USER_REPOSITORY } from '../user.repository';

@Injectable()
export class SearchUserInteractor {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository, // private readonly createTokenInteractor,
  ) {}

  async search(criterias: string) {
    const users = await this.userRepo.search(criterias);
    return users;
  }
}
