export class DateB {
  constructor(value: Date | string | number) {
    this._value = new Date(value);
  }

  protected readonly _value: Date;

  public get value(): Date {
    return this._value;
  }

  public static now(): DateB {
    return new DateB(Date.now());
  }
}
