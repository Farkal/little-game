import { EntityBase, BaseProps } from '../../core/entity.base';

export interface UserProps extends BaseProps {
  username: string;
  hashedPassword: string;
}

export class User extends EntityBase {
  private _username: string;
  private _hashedPassword: string;

  constructor(props: UserProps) {
    super(props);
    this._username = props.username;
    this._hashedPassword = props.hashedPassword;
  }

  get username() {
    return this._username;
  }

  get hashedPassword() {
    return this._hashedPassword;
  }
}
