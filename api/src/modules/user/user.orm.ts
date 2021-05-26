import { Column, Entity, OneToMany } from 'typeorm';
import { EntityOrm } from '@core/entity.orm';
import { HeroOrm } from '@modules/hero/hero.orm';

@Entity('user')
export class UserOrm extends EntityOrm {
  constructor(props?: UserOrm) {
    super(props);
  }

  @Column({ unique: true })
  username: string;

  @Column()
  hashedPassword: string;

  @OneToMany(() => HeroOrm, (hero) => hero.user, { onDelete: 'CASCADE' })
  heros?: HeroOrm[];
}
