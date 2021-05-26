const HeroFragment = `
  id
  name
  level
  rank
  health
  attack
  defense
  magik
`

export const READ_FIGHT = `
  query($id: String! ) {
    fight(id: $id) {
      hero {
        ${HeroFragment}
      }
      enemy {
        ${HeroFragment}
      }
      status
      rounds {
        number
        heroAttack
        enemyAttack
        heroHealthSub
        enemyHealthSub
      }
    }
  }
`
