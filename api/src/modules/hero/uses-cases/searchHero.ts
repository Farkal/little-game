import { Injectable, Inject } from '@nestjs/common';
import { Hero } from '../hero.entity';
import {
  HeroRepository,
  HERO_REPOSITORY,
  HerosSearchCriterias,
} from '../hero.repository';

@Injectable()
export class SearchHeroInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository, // private readonly createTokenInteractor,
  ) {}

  async search(criterias: HerosSearchCriterias) {
    const heros = await this.heroRepo.search(criterias);
    return heros;
  }
}
