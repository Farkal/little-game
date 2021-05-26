import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './fight.entity';
import { FightOrm } from './fight.orm';
import { FightMapper } from './fight.mapper';
import { NotFoundException } from '@core/exceptions';

export const FIGHT_REPOSITORY = 'FIGHT REPOSITORY';
export interface FightRepository {
  search(criterias: FightSearchCriterias): Promise<Fight[]>;
  read(id: string): Promise<Fight>;
  create(hero: Fight): Promise<Fight>;
  update(hero: Fight): Promise<Fight>;
}

export interface FightSearchCriterias {
  heroId: string;
}

export class FightDatabaseRepository implements FightRepository {
  constructor(
    @InjectRepository(FightOrm) private fightRepository: Repository<FightOrm>,
  ) {
    this.mapper = new FightMapper();
  }

  private readonly mapper: FightMapper;

  async search(criterias: FightSearchCriterias) {
    const fight = await this.fightRepository.find({
      where: criterias,
      order: { createdAt: 'DESC' },
    });
    return fight.map((u) => this.mapper.toDomain(u));
  }

  async read(id: string) {
    const fight = await this.fightRepository.findOne(id);
    if (fight) {
      return this.mapper.toDomain(fight);
    } else {
      throw new NotFoundException('Fight not found');
    }
  }

  async create(fight: Fight) {
    let fightOrm = this.mapper.toOrm(fight);
    fightOrm = await this.fightRepository.save(fightOrm);
    return this.mapper.toDomain(fightOrm);
  }

  async update(fight: Fight) {
    let fightOrm = this.mapper.toOrm(fight);
    fightOrm = await this.fightRepository.save(fightOrm);
    return this.mapper.toDomain(fightOrm);
  }
}
