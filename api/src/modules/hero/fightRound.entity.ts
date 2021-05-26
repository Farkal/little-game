import { EntityBase, BaseProps } from '@core/entity.base';

export interface FightRoundProps extends BaseProps {
  number: number;
  heroAttack: number;
  enemyAttack: number;
  heroHealthSub: number;
  enemyHealthSub: number;
  fightId: string;
}

export class FightRound extends EntityBase {
  private _number: number;
  private _heroAttack: number;
  private _enemyAttack: number;
  private _heroHealthSub: number;
  private _enemyHealthSub: number;
  private _fightId: string;

  constructor(props: FightRoundProps) {
    super(props);
    this._number = props.number;
    this._heroAttack = props.heroAttack;
    this._enemyAttack = props.enemyAttack;
    this._heroHealthSub = props.heroHealthSub;
    this._enemyHealthSub = props.enemyHealthSub;
    this._fightId = props.fightId;
  }

  get number() {
    return this._number;
  }
  get heroAttack() {
    return this._heroAttack;
  }

  get enemyAttack() {
    return this._enemyAttack;
  }

  get heroHealthSub() {
    return this._heroHealthSub;
  }

  get enemyHealthSub() {
    return this._enemyHealthSub;
  }

  get fightId() {
    return this._fightId;
  }
}
