import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException, AuthException } from '@core/exceptions';
import { Fight, FightStatus } from '../fight.entity';
import { FightRound } from '../fightRound.entity';
import { HeroRepository, HERO_REPOSITORY } from '../hero.repository';
import { FightRepository, FIGHT_REPOSITORY } from '../fight.repository';
import {
  FightRoundRepository,
  FIGHT_ROUND_REPOSITORY,
} from '../fightRound.repository';

@Injectable()
export class StartFightInteractor {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly heroRepo: HeroRepository,
    @Inject(FIGHT_REPOSITORY)
    private readonly fightRepo: FightRepository,
    @Inject(FIGHT_ROUND_REPOSITORY)
    private readonly fightRoundRepo: FightRoundRepository,
  ) {}

  async startFight(userId: string, id: string) {
    let hero = await this.heroRepo.read(id);
    if (hero.userId != userId) {
      throw new AuthException('Not Authorized');
    }

    // Find opponent
    const enemies = await this.heroRepo.searchEnemies(userId, hero.rank);
    if (enemies.length == 0) {
      throw new NotFoundException('No enemy found for fight');
    }
    let enemy = enemies[0];

    const fight = new Fight({
      heroId: hero.id.value,
      enemyId: enemy.id.value,
      status: FightStatus.Fighting,
    });
    await this.fightRepo.create(fight);
    const heroInitialHealth = hero.health;

    // Start fight
    const rounds = [];
    let roundNb = 0;
    while (hero.health > 0 && enemy.health > 0 && roundNb < 1000) {
      roundNb += 1;
      const heroFightRes = hero.fightRound(enemy);
      const enemyFightRes = enemy.fightRound(hero);
      enemy = heroFightRes.enemy;
      hero = enemyFightRes.enemy;
      const roundProps = {
        number: roundNb,
        fightId: fight.id.value,
        heroAttack: heroFightRes.attack,
        enemyAttack: enemyFightRes.attack,
        heroHealthSub: enemyFightRes.healthSub,
        enemyHealthSub: heroFightRes.healthSub,
      };
      rounds.push(new FightRound(roundProps));
    }

    // Update hero
    if (hero.health <= 0) {
      fight.status = FightStatus.Defeat;
      hero.lose();
    } else if (enemy.health <= 0) {
      fight.status = FightStatus.Victory;
      hero.win();
    } else {
      // console.log('DRAW', hero.health, enemy.health);
      fight.status = FightStatus.Draw;
    }

    hero.health = heroInitialHealth;
    await this.heroRepo.update(hero);
    await this.fightRoundRepo.bulkCreate(rounds);
    return await this.fightRepo.update(fight);
  }
}
