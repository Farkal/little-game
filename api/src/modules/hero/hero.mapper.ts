import { ID } from '@core/id.base';
import { DateB } from '@core/date.base';
import { Hero, HeroProps } from './hero.entity';
import { HeroOrm } from './hero.orm';
import { Hero as HeroGql } from './controllers/hero.graphql';
export class HeroMapper {
  public toGql(entity: Hero): HeroGql {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      name: entity.name,
      level: entity.level,
      rank: entity.rank,
      skillPoints: entity.skillPoints,
      health: entity.health,
      attack: entity.attack,
      defense: entity.defense,
      magik: entity.magik,
    };
    return new HeroGql(props);
  }

  public toOrm(entity: Hero): HeroOrm {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      name: entity.name,
      level: entity.level,
      rank: entity.rank,
      skillPoints: entity.skillPoints,
      health: entity.health,
      attack: entity.attack,
      defense: entity.defense,
      magik: entity.magik,
      userId: entity.userId,
    };
    return new HeroOrm(props);
  }

  public toDomain(entity: HeroOrm): Hero {
    const props: HeroProps = {
      id: new ID(entity.id),
      createdAt: new DateB(entity.createdAt),
      name: entity.name,
      level: entity.level,
      rank: entity.rank,
      skillPoints: entity.skillPoints,
      health: entity.health,
      attack: entity.attack,
      defense: entity.defense,
      magik: entity.magik,
      userId: entity.userId,
    };
    return new Hero(props);
  }
}
