const HeroFragment = `
  id
  name
  level
  rank
  skillPoints
  health
  attack
  defense
  magik
`
const HeroFights = `
  fights {
    id
    enemy {
      name
    }
    status
  }
`

export const SEARCH_HEROS = `
  query {
    heros {
      ${HeroFragment}
    }
  }
`

export const READ_HERO = `
  query($id: String! ) {
    hero(id: $id) {
      ${HeroFragment}
      ${HeroFights}
    }
  }
`
