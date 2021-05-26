import { Injectable, Inject } from '@nestjs/common';
import { FightRound } from '../fightRound.entity';
import {
  FightRoundRepository,
  FIGHT_ROUND_REPOSITORY,
  FightRoundSearchCriterias,
} from '../fightRound.repository';

@Injectable()
export class SearchFightRoundInteractor {
  constructor(
    @Inject(FIGHT_ROUND_REPOSITORY)
    private readonly fightRoundRepository: FightRoundRepository,
  ) {}

  async search(criterias: FightRoundSearchCriterias) {
    const rounds = await this.fightRoundRepository.search(criterias);
    return rounds;
  }
}
