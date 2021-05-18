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
  InputType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EntityGql } from '@core/entity.graphql';
import { CurrentUser, GqlAuthGuard, UserPayload } from '@core/auth';
import {
  CreateHeroInteractor,
  SearchHeroInteractor,
  ReadHeroInteractor,
  DeleteHeroInteractor,
  AttributeSkillPointsToHeroInteractor,
  // FightHeroInteractor
} from '../uses-cases';
import { HeroMapper } from '../hero.mapper';

@InputType()
export class AttributeSkillPointsInput {
  @Field()
  health: number;
  @Field()
  attack: number;
  @Field()
  defense: number;
  @Field()
  magik: number;
}

@ObjectType({ description: 'Object representing an Hero' })
export class Hero extends EntityGql {
  @Field()
  name: string;

  @Field()
  level: number;

  @Field()
  rank: number;

  @Field()
  skillPoints: number;

  @Field()
  health: number;

  @Field()
  attack: number;

  @Field()
  defense: number;

  @Field()
  magik: number;

  constructor(props?: Hero) {
    super(props);
  }
}

@Resolver(() => Hero)
export class HeroResolver {
  constructor(
    private readonly createHeroInteractor: CreateHeroInteractor,
    private readonly attributeSkillPointsToHeroInteractor: AttributeSkillPointsToHeroInteractor,
    private readonly searchHeroInteractor: SearchHeroInteractor,
    private readonly readHeroInteractor: ReadHeroInteractor,
    private readonly deleteHeroInteractor: DeleteHeroInteractor,
  ) // private readonly fightHeroInteractor: FightHeroInteractor,
  {
    this.mapper = new HeroMapper();
  }

  private readonly mapper: HeroMapper;

  @Query(() => [Hero], { description: 'Get all the heros' })
  @UseGuards(GqlAuthGuard)
  async heros(@CurrentUser() user: UserPayload): Promise<Hero[]> {
    const heros = await this.searchHeroInteractor.search({ userId: user.id });
    return heros.map((u) => this.mapper.toGql(u));
  }

  @Query(() => Hero, { nullable: true })
  async hero(@Args('id') id: string) {
    const hero = await this.readHeroInteractor.read(id);
    return this.mapper.toGql(hero);
  }

  @Mutation(() => Hero)
  @UseGuards(GqlAuthGuard)
  async createHero(
    @CurrentUser() user: UserPayload,
    @Args('name') name: string,
  ) {
    const newHero = await this.createHeroInteractor.create(user.id, name);
    return this.mapper.toGql(newHero);
  }

  @Mutation(() => Hero)
  @UseGuards(GqlAuthGuard)
  async attributeSkillPointsToHero(
    @CurrentUser() user: UserPayload,
    @Args('id') id: string,
    @Args('attributeSkillPointsInput') data: AttributeSkillPointsInput,
  ) {
    const hero =
      await this.attributeSkillPointsToHeroInteractor.attributeSkillPoints(
        user.id,
        id,
        data,
      );
    return this.mapper.toGql(hero);
  }

  // @Mutation(() => Fight)
  // @UseGuards(GqlAuthGuard)
  // async fightHero(
  //   @CurrentUser() user: UserPayload,
  //   @Args('id') id: string,
  // ) {
  //   const fight = await this.fightHeroInteractor.fight(user.id, id);
  //   return this.mapper.toGql(fight)
  // }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteHero(@CurrentUser() user: UserPayload, @Args('id') id: string) {
    await this.deleteHeroInteractor.delete(user.id, id);
    return true;
  }
}
