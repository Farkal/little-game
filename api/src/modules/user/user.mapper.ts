import { ID } from '@core/id.base';
import { DateB } from '@core/date.base';
import { User, UserProps } from './user.entity';
import { UserOrm } from './user.orm';
import { User as UserGql } from './controllers/user.graphql';
export class UserMapper {
  public toGql(entity: User): UserGql {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      username: entity.username,
    };
    return new UserGql(props);
  }

  public toOrm(entity: User): UserOrm {
    const props = {
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      username: entity.username,
      hashedPassword: entity.hashedPassword,
    };
    return new UserOrm(props);
  }

  public toDomain(entity: UserOrm): User {
    const props: UserProps = {
      id: new ID(entity.id),
      createdAt: new DateB(entity.createdAt),
      username: entity.username,
      hashedPassword: entity.hashedPassword,
    };
    return new User(props);
  }
}
