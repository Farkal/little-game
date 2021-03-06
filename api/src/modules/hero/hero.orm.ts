import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EntityOrm } from '@core/entity.orm';
import { UserOrm } from '@modules/user/user.orm';
import { FightOrm } from './fight.orm';

@Entity('hero')
export class HeroOrm extends EntityOrm {
  constructor(props?: HeroOrm) {
    super(props);
  }

  @Column()
  name: string;

  @Column()
  level: number;

  @Column()
  rank: number;

  @Column()
  skillPoints: number;

  @Column()
  health: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  magik: number;

  @Column()
  userId: string;

  @ManyToOne(() => UserOrm, (user) => user.heros)
  @JoinColumn()
  user?: UserOrm;

  @OneToMany(() => FightOrm, (fight) => fight.hero, { onDelete: 'CASCADE' })
  @JoinColumn()
  fights?: FightOrm[];
}
