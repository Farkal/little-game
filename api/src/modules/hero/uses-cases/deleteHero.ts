import { Injectable, Inject } from '@nestjs/common';
import { Hero } from '../hero.entity';
import { HeroRepository, HERO_REPOSITORY } from '../hero.repository';
import { AuthException } from '@core/exceptions';

@Injectable()
export class DeleteHeroInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository, // private readonly createTokenInteractor,
  ) {}

  async delete(userId: string, id: string) {
    const hero = await this.heroRepo.read(id);
    if (hero.userId != userId) {
      throw new AuthException('Not Authorized');
    }
    return await this.heroRepo.delete(id);
  }
}
