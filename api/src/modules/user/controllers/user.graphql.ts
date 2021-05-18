import {
  Field,
  ID,
  ObjectType,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
  Context,
  Args,
} from '@nestjs/graphql';
import { EntityGql } from '@core/entity.graphql';
import {
  LoginUserInteractor,
  CreateUserInteractor,
  SearchUserInteractor,
} from '../uses-cases';
import { User as UserDomain } from '../user.entity';
import { UserMapper } from '../user.mapper';

@ObjectType({ description: 'Object representing an User' })
export class User extends EntityGql {
  @Field()
  username: string;

  constructor(props?: User) {
    super(props);
  }
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userLoginInteractor: LoginUserInteractor,
    private readonly createUserInteractor: CreateUserInteractor,
    private readonly searchUserInteractor: SearchUserInteractor,
  ) {
    this.mapper = new UserMapper();
  }

  private readonly mapper: UserMapper;

  @Query((returns) => [User], { description: 'Get all the users' })
  async users(): Promise<User[]> {
    const users = await this.searchUserInteractor.search('');
    return users.map((u) => this.mapper.toGql(u));
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string) {
    return this.mapper.toGql(
      new UserDomain({ username: 'trt', hashedPassword: 'titi' }),
    );
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const token = await this.userLoginInteractor.login(username, password);
    return token;
  }

  @Mutation(() => User)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const newUser = await this.createUserInteractor.create(username, password);
    return this.mapper.toGql(newUser);
  }
}
