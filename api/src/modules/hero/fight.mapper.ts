import { ID } from '@core/id.base';
import { DateB } from '@core/date.base';
import { Fight, FightProps } from './fight.entity';
import { FightOrm } from './fight.orm';
import { Fight as FightGql } from './controllers/hero.graphql';
export class FightMapper {
  public toGql(entity: Fight): FightGql {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      heroId: entity.heroId,
      enemyId: entity.enemyId,
      status: entity.status,
    };
    return new FightGql(props);
  }

  public toOrm(entity: Fight): FightOrm {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      heroId: entity.heroId,
      enemyId: entity.enemyId,
      status: entity.status,
    };
    return new FightOrm(props);
  }

  public toDomain(entity: FightOrm): Fight {
    const props: FightProps = {
      id: new ID(entity.id),
      createdAt: new DateB(entity.createdAt),
      heroId: entity.heroId,
      enemyId: entity.enemyId,
      status: entity.status,
    };
    return new Fight(props);
  }
}
