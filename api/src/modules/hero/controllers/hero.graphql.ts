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
  registerEnumType,
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
  StartFightInteractor,
  ReadFightInteractor,
  SearchFightInteractor,
  SearchFightRoundInteractor,
} from '../uses-cases';
import { HeroMapper } from '../hero.mapper';
import { FightMapper } from '../fight.mapper';
import { FightRoundMapper } from '../fightRound.mapper';
import { FightStatus } from '../fight.entity';

registerEnumType(FightStatus, {
  name: 'FightStatus',
});

@ObjectType({ description: 'Object representing a Fight' })
export class FightRound extends EntityGql {
  @Field()
  number: number;
  @Field()
  heroAttack: number;
  @Field()
  enemyAttack: number;
  @Field()
  heroHealthSub: number;
  @Field()
  enemyHealthSub: number;

  constructor(props?: FightRound) {
    super(props);
  }
}

@ObjectType({ description: 'Object representing a Fight' })
export class Fight extends EntityGql {
  heroId: string;
  enemyId: string;

  @Field((type) => FightStatus)
  status: FightStatus;

  constructor(props?: Fight) {
    super(props);
  }
}

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

@Resolver((of) => Hero)
export class HeroResolver {
  constructor(
    private readonly createHeroInteractor: CreateHeroInteractor,
    private readonly attributeSkillPointsToHeroInteractor: AttributeSkillPointsToHeroInteractor,
    private readonly searchHeroInteractor: SearchHeroInteractor,
    private readonly readHeroInteractor: ReadHeroInteractor,
    private readonly deleteHeroInteractor: DeleteHeroInteractor,
    private readonly searchFightInteractor: SearchFightInteractor,
  ) {
    this.mapper = new HeroMapper();
    this.fightMapper = new FightMapper();
  }

  private readonly mapper: HeroMapper;
  private readonly fightMapper: FightMapper;

  @ResolveField(() => [Fight])
  async fights(@Parent() hero: Hero) {
    const fights = await this.searchFightInteractor.search({
      heroId: hero.id,
    });
    return fights.map((u) => this.fightMapper.toGql(u));
  }

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

@Resolver((of) => Fight)
export class FightResolver {
  constructor(
    private readonly readHeroInteractor: ReadHeroInteractor,
    private readonly searchFightRoundInteractor: SearchFightRoundInteractor,
    private readonly startFightInteractor: StartFightInteractor,
    private readonly readFightInteractor: ReadFightInteractor,
  ) {
    this.mapper = new FightMapper();
    this.heroMapper = new HeroMapper();
    this.fightRoundMapper = new FightRoundMapper();
  }
  private readonly mapper: FightMapper;
  private readonly heroMapper: HeroMapper;
  private readonly fightRoundMapper: FightRoundMapper;

  @ResolveField(() => Hero)
  async hero(@Parent() fight: Fight) {
    const hero = await this.readHeroInteractor.read(fight.heroId);
    return this.heroMapper.toGql(hero);
  }

  @ResolveField(() => Hero)
  async enemy(@Parent() fight: Fight) {
    const enemy = await this.readHeroInteractor.read(fight.enemyId);
    return this.heroMapper.toGql(enemy);
  }

  @ResolveField(() => [FightRound])
  async rounds(@Parent() fight: Fight) {
    const rounds = await this.searchFightRoundInteractor.search({
      fightId: fight.id,
    });
    return rounds.map((u) => this.fightRoundMapper.toGql(u));
  }

  @Query(() => Fight, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async fight(@Args('id') id: string) {
    const fight = await this.readFightInteractor.read(id);
    return this.mapper.toGql(fight);
  }

  @Mutation(() => Fight)
  @UseGuards(GqlAuthGuard)
  async startFight(
    @CurrentUser() user: UserPayload,
    @Args('heroId') heroId: string,
  ) {
    const newFight = await this.startFightInteractor.startFight(
      user.id,
      heroId,
    );
    return this.mapper.toGql(newFight);
  }
}
