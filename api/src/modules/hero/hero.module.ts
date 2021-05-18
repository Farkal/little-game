import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroOrm } from './hero.orm';
import { HeroResolver } from './controllers/hero.graphql';
import {
  CreateHeroInteractor,
  ReadHeroInteractor,
  SearchHeroInteractor,
  DeleteHeroInteractor,
  AttributeSkillPointsToHeroInteractor,
} from './uses-cases';
import { HeroDatabaseRepository, HERO_REPOSITORY } from './hero.repository';
@Module({
  imports: [TypeOrmModule.forFeature([HeroOrm])],
  providers: [
    HeroResolver,
    CreateHeroInteractor,
    AttributeSkillPointsToHeroInteractor,
    DeleteHeroInteractor,
    ReadHeroInteractor,
    SearchHeroInteractor,
    {
      provide: HERO_REPOSITORY,
      useClass: HeroDatabaseRepository,
    },
  ],
})
export class HeroModule {}
