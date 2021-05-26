import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { EntityOrm } from '@core/entity.orm';
import { FightOrm } from './fight.orm';

@Entity('fight-round')
export class FightRoundOrm extends EntityOrm {
  constructor(props?: FightRoundOrm) {
    super(props);
  }

  @Column()
  number: number;

  @Column()
  heroAttack: number;

  @Column()
  enemyAttack: number;

  @Column()
  heroHealthSub: number;

  @Column()
  enemyHealthSub: number;

  @Column()
  fightId: string;

  @ManyToOne(() => FightOrm, (fight) => fight.rounds)
  @JoinColumn()
  fight?: FightOrm;
}
