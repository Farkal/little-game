import { ID } from '@core/id.base';
import { DateB } from '@core/date.base';
import { FightRound, FightRoundProps } from './fightRound.entity';
import { FightRoundOrm } from './fightRound.orm';
import { FightRound as FightRoundGql } from './controllers/hero.graphql';
export class FightRoundMapper {
  public toGql(entity: FightRound): FightRoundGql {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      number: entity.number,
      heroAttack: entity.heroAttack,
      enemyAttack: entity.enemyAttack,
      heroHealthSub: entity.heroHealthSub,
      enemyHealthSub: entity.enemyHealthSub,
      fightId: entity.fightId,
    };
    return new FightRoundGql(props);
  }

  public toOrm(entity: FightRound): FightRoundOrm {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      number: entity.number,
      heroAttack: entity.heroAttack,
      enemyAttack: entity.enemyAttack,
      heroHealthSub: entity.heroHealthSub,
      enemyHealthSub: entity.enemyHealthSub,
      fightId: entity.fightId,
    };
    return new FightRoundOrm(props);
  }

  public toDomain(entity: FightRoundOrm): FightRound {
    const props: FightRoundProps = {
      id: new ID(entity.id),
      createdAt: new DateB(entity.createdAt),
      number: entity.number,
      heroAttack: entity.heroAttack,
      enemyAttack: entity.enemyAttack,
      heroHealthSub: entity.heroHealthSub,
      enemyHealthSub: entity.enemyHealthSub,
      fightId: entity.fightId,
    };
    return new FightRound(props);
  }
}
