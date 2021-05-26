import { Injectable, Inject } from '@nestjs/common';
import { Hero } from '../hero.entity';
import { HeroRepository, HERO_REPOSITORY } from '../hero.repository';

@Injectable()
export class CreateHeroInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository,
  ) {}

  async create(userId: string, name: string) {
    const hero = new Hero({
      name,
      level: 1,
      rank: 1,
      skillPoints: 12,
      health: 10,
      attack: 0,
      defense: 0,
      magik: 0,
      userId,
    });
    return await this.heroRepo.create(hero);
  }
}
