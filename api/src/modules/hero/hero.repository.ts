import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.entity';
import { HeroOrm } from './hero.orm';
import { HeroMapper } from './hero.mapper';
import { NotFoundException } from '@core/exceptions';

export const HERO_REPOSITORY = 'HERO REPOSITORY';
export interface HeroRepository {
  search(criterias: HerosSearchCriterias): Promise<Hero[]>;
  read(id: string): Promise<Hero>;
  create(hero: Hero): Promise<Hero>;
  update(hero: Hero): Promise<Hero>;
  delete(id: string): Promise<Boolean>;
}

export interface HerosSearchCriterias {
  userId: string;
}

export class HeroDatabaseRepository implements HeroRepository {
  constructor(
    @InjectRepository(HeroOrm) private herosRepository: Repository<HeroOrm>,
  ) {
    this.mapper = new HeroMapper();
  }

  private readonly mapper: HeroMapper;

  async search(criterias: HerosSearchCriterias) {
    const heros = await this.herosRepository.find(criterias);
    return heros.map((u) => this.mapper.toDomain(u));
  }

  async read(id: string) {
    const hero = await this.herosRepository.findOne(id);
    if (hero) {
      return this.mapper.toDomain(hero);
    } else {
      throw new NotFoundException('Hero not found');
    }
  }

  async create(hero: Hero) {
    let heroOrm = this.mapper.toOrm(hero);
    heroOrm = await this.herosRepository.save(heroOrm);
    return this.mapper.toDomain(heroOrm);
  }

  async update(hero: Hero) {
    let heroOrm = this.mapper.toOrm(hero);
    heroOrm = await this.herosRepository.save(heroOrm);
    return this.mapper.toDomain(heroOrm);
  }

  async delete(id: string) {
    await this.herosRepository.delete(id);
    return true;
  }
}

export class HeroFakeRepository {
  constructor() {
    const hero = new Hero({
      name: 'jojo',
      level: 1,
      rank: 1,
      skillPoints: 12,
      health: 10,
      attack: 0,
      defense: 0,
      magik: 0,
      userId: 'myUserId',
    });
    this.heros = [hero];
  }

  private heros: Hero[];
  async search(criterias: HerosSearchCriterias) {
    return this.heros;
  }
  async read(id: string) {
    return this.heros[0];
  }
  create(hero: Hero) {
    this.heros.push(hero);
  }
  update(hero: Hero) {
    this.heros.push(hero);
  }
  delete(id: string) {
    return true;
  }
}
