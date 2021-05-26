import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FightRound } from './fightRound.entity';
import { FightRoundOrm } from './fightRound.orm';
import { FightRoundMapper } from './fightRound.mapper';
import { NotFoundException } from '@core/exceptions';

export const FIGHT_ROUND_REPOSITORY = 'FIGHT ROUND REPOSITORY';
export interface FightRoundRepository {
  search(criterias: FightRoundSearchCriterias): Promise<FightRound[]>;
  read(id: string): Promise<FightRound>;
  bulkCreate(fightRounds: FightRound[]): Promise<FightRound[]>;
}

export interface FightRoundSearchCriterias {
  fightId: string;
}

export class FightRoundDatabaseRepository implements FightRoundRepository {
  constructor(
    @InjectRepository(FightRoundOrm)
    private fightRoundRepository: Repository<FightRoundOrm>,
  ) {
    this.mapper = new FightRoundMapper();
  }

  private readonly mapper: FightRoundMapper;

  async search(criterias: FightRoundSearchCriterias) {
    const fightRounds = await this.fightRoundRepository.find(criterias);
    return fightRounds.map((u) => this.mapper.toDomain(u));
  }

  async read(id: string) {
    const fightRound = await this.fightRoundRepository.findOne(id);
    if (fightRound) {
      return this.mapper.toDomain(fightRound);
    } else {
      throw new NotFoundException('Fight Round not found');
    }
  }

  async bulkCreate(fightRounds: FightRound[]) {
    let fightRoundsOrm = fightRounds.map((u) => this.mapper.toOrm(u));
    fightRoundsOrm = await this.fightRoundRepository.save(fightRoundsOrm);
    return fightRoundsOrm.map((u) => this.mapper.toDomain(u));
  }
}
