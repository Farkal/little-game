import { Hero } from '../hero.entity';
import { AttributeSkillPointsToHeroInteractor } from './attributeSkillPointsToHero';

describe('AttributeSkillPointsToHeroInteractor', () => {
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
  let heroRepository = {
    read: async () => {
      return hero;
    },
    search: async () => [hero],
    create: async () => hero,
    update: async () => hero,
    delete: async () => true,
  };

  it('should attribute all skill points', async () => {
    const interactor = new AttributeSkillPointsToHeroInteractor(heroRepository);
    const res = await interactor.attributeSkillPoints('myUserId', 'myId', {
      health: 1,
      attack: 6,
      defense: 3,
      magik: 1,
    });
    expect(res.health).toBe(11);
    expect(res.attack).toBe(6);
    expect(res.defense).toBe(3);
    expect(res.magik).toBe(1);
    expect(res.skillPoints).toBe(0);
  });
  it('should throw if more skill points attributed than availables', async () => {
    const interactor = new AttributeSkillPointsToHeroInteractor(heroRepository);
    await expect(interactor.attributeSkillPoints('myUserId', 'myId', {
      health: 1,
      attack: 7,
      defense: 3,
      magik: 1,
    })).rejects.toThrow();
  });
});
