import { v4 as uuidV4, validate } from 'uuid';

export class ID {
  constructor(value: string) {
    this._value = value;
  }

  protected readonly _value: string;

  public get value(): string {
    return this._value;
  }
  /**
   *Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): ID {
    return new ID(uuidV4());
  }
}
