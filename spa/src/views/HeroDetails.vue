<script lang="ts">
import { useQuery, useMutation } from '@urql/vue'
import { READ_HERO } from '../graphql/heros'
import FightButton from '../components/FightButton.vue'
import Skill from '../components/Skill.vue'
export default {
  components: {
    Skill,
    FightButton,
  },
  props: ['id'],
  data() {
    return {
      healthInc: 0,
      attackInc: 0,
      defenseInc: 0,
      magikInc: 0,
    }
  },
  setup({ id }) {
    const { executeMutation: saveHero } = useMutation(`
            mutation ($id: String!, $attributeSkillPointsInput: AttributeSkillPointsInput!) {
              attributeSkillPointsToHero (id: $id, attributeSkillPointsInput: $attributeSkillPointsInput) {
              id
            }
            }
          `)
    const { executeMutation: deleteHero } = useMutation(`
            mutation ($id: String!) {
              deleteHero (id: $id)
            }
          `)
    const result = useQuery({
      query: READ_HERO,
      variables: { id },
    })

    return {
      deleteHero,
      saveHero,
      loading: result.fetching,
      data: result.data,
      error: result.error,
    }
  },
  computed: {
    needSave() {
      return this.healthInc + this.attackInc + this.defenseInc + this.magikInc > 0
    },
  },
  methods: {
    updateHealth(val) {
      if (this.healthInc + val < 0) return
      if (this.data.hero.skillPoints - val < 0) return
      this.data.hero.skillPoints -= val
      this.healthInc += val
    },
    updateAttack(val) {
      if (this.attackInc + val < 0) return
      let currentAttack = this.data.hero.attack + this.attackInc
      if (val < 0) currentAttack += val
      let skillPointCost = Math.ceil(currentAttack / 5) * val
      skillPointCost = skillPointCost ? skillPointCost : 1 * val
      if (this.data.hero.skillPoints - skillPointCost < 0) return
      this.data.hero.skillPoints -= skillPointCost
      this.attackInc += val
    },
    updateDefense(val) {
      if (this.defenseInc + val < 0) return
      let currentDefense = this.data.hero.defense + this.defenseInc
      if (val < 0) currentDefense += val
      let skillPointCost = Math.ceil(currentDefense / 5) * val
      skillPointCost = skillPointCost ? skillPointCost : 1 * val
      if (this.data.hero.skillPoints - skillPointCost < 0) return
      this.data.hero.skillPoints -= skillPointCost
      this.defenseInc += val
    },
    updateMagik(val) {
      if (this.magikInc + val < 0) return
      let currentMagik = this.data.hero.magik + this.magikInc
      if (val < 0) currentMagik += val
      let skillPointCost = Math.ceil(currentMagik / 5) * val
      skillPointCost = skillPointCost ? skillPointCost : 1 * val
      if (this.data.hero.skillPoints - skillPointCost < 0) return
      this.data.hero.skillPoints -= skillPointCost
      this.magikInc += val
    },
    async saveHero() {
      if (!this.needSave) return
      const variables = {
        id: this.id,
        attributeSkillPointsInput: {
          health: this.healthInc,
          attack: this.attackInc,
          defense: this.defenseInc,
          magik: this.magikInc,
        },
      }
      const res = await this.saveHero(variables)
      if (res.data && res.data.attributeSkillPointsToHero) {
        this.healthInc = 0
        this.attackInc = 0
        this.defenseInc = 0
        this.magikInc = 0
      }
    },
    async deleteHero() {
      const variables = { id: this.id }
      const res = await this.deleteHero(variables)
      if (!res.error) {
        this.$router.push({ name: 'heros' })
      }
    },
    statusClass(status) {
      if (status == 'Victory') {
        return 'bg-green-500'
      }
      if (status == 'Defeat') {
        return 'bg-red-500'
      }
      return 'bg-yellow-500'
    },
  },
}
</script>
<template>
  <div class="p-5" v-if="data">
    <div class="flex justify-between">
      <div
        class="
          bg-blue-500
          rounded-full
          h-6
          px-2
          flex
          justify-items-center
          text-white
          font-semibold
          text-sm
        "
      >
        <span class="flex items-center">lvl {{ data.hero.level }}</span>
      </div>
      <div class="h-6 px-2 flex justify-items-center text-green-600 font-semibold text-sm relative">
        <span class="flex items-center">{{ data.hero.rank }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </div>
    </div>
    <div class="ml-2">
      <div class="mt-3 text-3xl font-bold leading-8">{{ data.hero.name }}</div>
      <div class="mt-3 font-bold leading-8">Skill points: {{ data.hero.skillPoints }}</div>
      <Skill
        :current="data.hero.health"
        :inc="healthInc"
        @update:inc="updateHealth"
        icon="health"
      />
      <Skill
        :current="data.hero.attack"
        :inc="attackInc"
        @update:inc="updateAttack"
        icon="attack"
      />
      <Skill
        :current="data.hero.defense"
        :inc="defenseInc"
        @update:inc="updateDefense"
        icon="defense"
      />
      <Skill :current="data.hero.magik" :inc="magikInc" @update:inc="updateMagik" icon="magik" />
    </div>
    <div class="flex justify-start">
      <div class="inline-block mr-2 mt-2">
        <FightButton :id="id" />
      </div>
      <div class="inline-block mr-2 mt-2">
        <button
          @click="saveHero"
          type="button"
          class="
            focus:outline-none
            text-green-600 text-xs
            py-2
            px-4
            rounded-md
            border border-green-600
            hover:bg-green-50
            flex
            items-center
          "
          :class="{ 'border-gray-600 text-gray-600 hover:bg-gray-50': !needSave }"
        >
          <svg
            class="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          Save
        </button>
      </div>
      <div class="inline-block mr-2 mt-2">
        <button
          @click="deleteHero"
          type="button"
          class="
            focus:outline-none
            text-red-600 text-xs
            py-2
            px-4
            rounded-md
            border border-red-600
            hover:bg-red-50
            flex
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            /></svg
          >Delete
        </button>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-12 gap-6">
      <p>Fights:</p>
      <div
        v-for="fight in data.hero.fights"
        class="shadow-xl rounded-lg col-span-12 intro-y bg-white"
      >
        <div class="w-full text-white" :class="statusClass(fight.status)">
          <div class="container flex items-center justify-between px-6 py-4 mx-auto">
            <div class="flex">
              <svg v-if="fight.status == 'Victory'" class="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
                />
              </svg>
              <svg v-if="fight.status == 'Draw'" class="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 6H14L17.29 2.7A1 1 0 0 1 18.71 2.7L21.29 5.29A1 1 0 0 1 21.29 6.7L19 9H11V11A1 1 0 0 1 10 12A1 1 0 0 1 9 11V8A2 2 0 0 1 11 6M5 11V15L2.71 17.29A1 1 0 0 0 2.71 18.7L5.29 21.29A1 1 0 0 0 6.71 21.29L11 17H15A1 1 0 0 0 16 16V15H17A1 1 0 0 0 18 14V13H19A1 1 0 0 0 20 12V11H13V12A2 2 0 0 1 11 14H9A2 2 0 0 1 7 12V9Z"
                />
              </svg>
              <svg v-if="fight.status == 'Defeat'" class="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
                />
              </svg>

              <a class="mx-3">{{ fight.status }}: You vs {{ fight.enemy.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
