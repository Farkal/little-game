import { EntityBase, BaseProps } from '@core/entity.base';
import { User } from '@modules/user/user.entity';

export interface HeroProps extends BaseProps {
  name: string;
  level: number;
  rank: number;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  userId: string;
}

export class Hero extends EntityBase {
  private _name: string;
  private _level: number;
  private _rank: number;
  private _skillPoints: number;
  private _health: number;
  private _attack: number;
  private _defense: number;
  private _magik: number;
  private _userId: string;

  constructor(props: HeroProps) {
    super(props);
    this._name = props.name;
    this._level = props.level;
    this._rank = props.rank;
    this._skillPoints = props.skillPoints;
    this._health = props.health;
    this._attack = props.attack;
    this._defense = props.defense;
    this._magik = props.magik;
    this._userId = props.userId;
  }

  get name() {
    return this._name;
  }
  get level() {
    return this._level;
  }
  get rank() {
    return this._rank;
  }
  get skillPoints() {
    return this._skillPoints;
  }
  set skillPoints(val: number) {
    this._skillPoints = val;
  }
  get health() {
    return this._health;
  }
  set health(val: number) {
    this._health = val
  }
  get attack() {
    return this._attack;
  }
  set attack(val: number) {
    this._attack = val
  }
  get defense() {
    return this._defense;
  }
  set defense(val: number) {
    this._defense = val
  }
  get magik() {
    return this._magik;
  }
  set magik(val: number) {
    this._magik = val
  }
  get userId() {
    return this._userId;
  }
}
