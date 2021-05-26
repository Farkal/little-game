import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroOrm } from './hero.orm';
import { FightOrm } from './fight.orm';
import { FightRoundOrm } from './fightRound.orm';
import { HeroResolver, FightResolver } from './controllers/hero.graphql';
// import { FightResolver } from './controllers/fight.graphql';
import {
  CreateHeroInteractor,
  ReadHeroInteractor,
  SearchHeroInteractor,
  DeleteHeroInteractor,
  AttributeSkillPointsToHeroInteractor,
  StartFightInteractor,
  ReadFightInteractor,
  SearchFightInteractor,
  SearchFightRoundInteractor,
} from './uses-cases';
import { HeroDatabaseRepository, HERO_REPOSITORY } from './hero.repository';
import { FightDatabaseRepository, FIGHT_REPOSITORY } from './fight.repository';
import {
  FightRoundDatabaseRepository,
  FIGHT_ROUND_REPOSITORY,
} from './fightRound.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroOrm]),
    TypeOrmModule.forFeature([FightOrm]),
    TypeOrmModule.forFeature([FightRoundOrm]),
  ],
  providers: [
    HeroResolver,
    FightResolver,
    CreateHeroInteractor,
    AttributeSkillPointsToHeroInteractor,
    DeleteHeroInteractor,
    ReadHeroInteractor,
    SearchHeroInteractor,
    StartFightInteractor,
    ReadFightInteractor,
    SearchFightInteractor,
    SearchFightRoundInteractor,
    {
      provide: HERO_REPOSITORY,
      useClass: HeroDatabaseRepository,
    },
    {
      provide: FIGHT_REPOSITORY,
      useClass: FightDatabaseRepository,
    },
    {
      provide: FIGHT_ROUND_REPOSITORY,
      useClass: FightRoundDatabaseRepository,
    },
  ],
})
export class HeroModule {}
