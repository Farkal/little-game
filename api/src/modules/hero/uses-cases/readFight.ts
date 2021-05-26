import { Injectable, Inject } from '@nestjs/common';
import { FightRepository, FIGHT_REPOSITORY } from '../fight.repository';

@Injectable()
export class ReadFightInteractor {
  constructor(
    @Inject(FIGHT_REPOSITORY)
    private readonly fightRepo: FightRepository,
  ) {}

  async read(id: string) {
    return await this.fightRepo.read(id);
  }
}
