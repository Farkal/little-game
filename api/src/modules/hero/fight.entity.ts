import { EntityBase, BaseProps } from '@core/entity.base';

export enum FightStatus {
  Fighting,
  Victory,
  Defeat,
  Draw,
}

export interface FightProps extends BaseProps {
  heroId: string;
  enemyId: string;
  status: FightStatus;
}

export class Fight extends EntityBase {
  private _heroId: string;
  private _enemyId: string;
  private _status: FightStatus;

  constructor(props: FightProps) {
    super(props);
    this._heroId = props.heroId;
    this._enemyId = props.enemyId;
    this._status = props.status;
  }

  get heroId() {
    return this._heroId;
  }
  get enemyId() {
    return this._enemyId;
  }
  get status() {
    return this._status;
  }
  set status(val: FightStatus) {
    this._status = val;
  }
}
