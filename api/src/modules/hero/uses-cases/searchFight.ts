import { Injectable, Inject } from '@nestjs/common';
import { FightRound } from '../fightRound.entity';
import {
  FightRepository,
  FIGHT_REPOSITORY,
  FightSearchCriterias,
} from '../fight.repository';

@Injectable()
export class SearchFightInteractor {
  constructor(
    @Inject(FIGHT_REPOSITORY)
    private readonly fightRepository: FightRepository,
  ) {}

  async search(criterias: FightSearchCriterias) {
    const fights = await this.fightRepository.search(criterias);
    return fights;
  }
}
