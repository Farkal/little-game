import { ID } from './id.base';
import { DateB } from './date.base';

export interface BaseProps {
  id?: ID;
  createdAt?: DateB;
}

export abstract class EntityBase {
  constructor(props: BaseProps) {
    this._id = props.id ? props.id : ID.generate();
    this._createdAt = props.createdAt ? props.createdAt : DateB.now();
  }

  private readonly _id: ID;
  private readonly _createdAt: DateB;

  get id(): ID {
    return this._id;
  }

  get createdAt(): DateB {
    return this._createdAt;
  }
}
