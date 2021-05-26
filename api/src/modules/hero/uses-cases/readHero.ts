import { Injectable, Inject } from '@nestjs/common';
import { HeroRepository, HERO_REPOSITORY } from '../hero.repository';

@Injectable()
export class ReadHeroInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository,
  ) {}

  async read(id: string) {
    return await this.heroRepo.read(id);
  }
}
