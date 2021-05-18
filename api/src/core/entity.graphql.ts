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

@ObjectType()
export abstract class EntityGql {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @Field(() => ID)
  id: string;

  @Field()
  createdAt!: Date;
}
