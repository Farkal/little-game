<script lang="ts">
import { useQuery, useMutation } from '@urql/vue'
import { READ_HERO } from '../graphql/heros'
import Skill from '../components/Skill.vue'
export default {
  components: {
    Skill,
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
    const { executeMutation: fight } = useMutation(`
            mutation ($id: String!) {
              fight (id: $id) {
                  id
                }
            }
          `)
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
    async fight() {
      const variables = { id: this.id }
      const res = await this.fight(variables)
      if (res.data && res.data.fight) {
        this.$router.push({ name: 'fight', params: { id: res.data.fight.id } })
      }
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
        <button
          type="button"
          class="
            focus:outline-none
            text-blue-600 text-xs
            py-2
            px-4
            rounded-md
            border border-blue-600
            hover:bg-blue-50
            flex
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clip-rule="evenodd"
            />
          </svg>
          Fight
        </button>
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
  </div>
</template>
