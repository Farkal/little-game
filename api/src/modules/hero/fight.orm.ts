import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { EntityOrm } from '@core/entity.orm';
import { HeroOrm } from './hero.orm';
import { FightRoundOrm } from './fightRound.orm';

@Entity('fight')
export class FightOrm extends EntityOrm {
  constructor(props?: FightOrm) {
    super(props);
  }

  @Column()
  heroId: string;

  @Column()
  enemyId: string;

  @Column()
  status: number;

  @ManyToOne(() => HeroOrm, (hero) => hero.fights, { onDelete: 'CASCADE' })
  @JoinColumn()
  hero?: HeroOrm;

  @OneToMany(() => FightRoundOrm, (fightRound) => fightRound.fight, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  rounds?: FightRoundOrm[];
}
