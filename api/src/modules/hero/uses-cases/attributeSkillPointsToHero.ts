import { Injectable, Inject } from '@nestjs/common';
import { ArgumentInvalidException } from '@core/exceptions';
import { Hero } from '../hero.entity';
import { HeroRepository, HERO_REPOSITORY } from '../hero.repository';
import { AttributeSkillPointsInput } from '../controllers/hero.graphql';

@Injectable()
export class AttributeSkillPointsToHeroInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository, // private readonly createTokenInteractor,
  ) {}

  private computeSpecialSkill(current: number, add: number) {
    let nbSkillPointUsed = 0;
    for (let i = 0; i < add; i++) {
      const cost = Math.ceil((current + i) / 5) || 1;
      nbSkillPointUsed += cost;
    }
    return nbSkillPointUsed;
  }

  async attributeSkillPoints(
    userId: string,
    id: string,
    data: AttributeSkillPointsInput,
  ) {
    const hero = await this.heroRepo.read(id);
    let nbSkillPointUsed = data.health;
    nbSkillPointUsed += this.computeSpecialSkill(hero.attack, data.attack);
    nbSkillPointUsed += this.computeSpecialSkill(hero.defense, data.defense);
    nbSkillPointUsed += this.computeSpecialSkill(hero.magik, data.magik);
    if (hero.skillPoints < nbSkillPointUsed) {
      throw new ArgumentInvalidException(
        'Invalid arguments for skillPoints attribution',
        { heroSkillPoints: hero.skillPoints, nbSkillPointUsed },
      );
    }
    hero.health += data.health;
    hero.attack += data.attack;
    hero.defense += data.defense;
    hero.magik += data.magik;
    hero.skillPoints -= nbSkillPointUsed;
    return await this.heroRepo.update(hero);
  }
}
