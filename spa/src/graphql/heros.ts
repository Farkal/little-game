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
    }
  }
`
