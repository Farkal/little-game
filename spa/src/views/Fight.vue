<script lang="ts">
import { useQuery, useMutation } from '@urql/vue'
import { READ_FIGHT } from '../graphql/fight'
import HeroInfo from '../components/HeroInfo.vue'
export default {
  components: {
    HeroInfo,
  },
  props: ['id'],
  setup({ id }) {
    const result = useQuery({
      query: READ_FIGHT,
      variables: { id },
    })

    return {
      loading: result.fetching,
      data: result.data,
      error: result.error,
    }
  },
  methods: {
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
      <div class="p-5">
        <HeroInfo :hero="data.fight.hero" />
      </div>
      <div class="font-bold text-5xl text-yellow-400">VS</div>
      <div class="p-5">
        <HeroInfo :hero="data.fight.enemy" />
      </div>
    </div>
    <div class="flex justify-start">
      <div class="inline-block mr-2 mt-2">
        <button
          @click="$router.go(-1)"
          type="button"
          class="
            focus:outline-none
            text-gray-600 text-xs
            py-2
            px-4
            rounded-md
            border border-gray-600
            hover:bg-gray-50
            flex
            items-center
          "
        >
          <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-12 gap-2">
      <div
        v-for="round in data.fight.rounds"
        class="shadow-xl rounded-lg col-span-12 intro-y bg-white"
      >
        <div class="w-full text-white bg-blue-500">
          <div class="container flex items-center justify-between px-6 py-4 mx-auto">
            <div class="flex">
              <p class="mx-3">
                Round {{ round.number }}: Your attack: {{ round.heroAttack }} Enemy loose
                {{ round.enemyHealthSub }} health - Enemy attack: {{ round.enemyAttack }} You loose
                {{ round.heroHealthSub }} health
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full text-white col-span-12" :class="statusClass(data.fight.status)">
        <div class="container flex items-center justify-center px-6 py-4 mx-auto">
          <div class="flex">
            <svg v-if="data.fight.status == 'Victory'" class="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
              />
            </svg>
            <svg v-if="data.fight.status == 'Draw'" class="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 6H14L17.29 2.7A1 1 0 0 1 18.71 2.7L21.29 5.29A1 1 0 0 1 21.29 6.7L19 9H11V11A1 1 0 0 1 10 12A1 1 0 0 1 9 11V8A2 2 0 0 1 11 6M5 11V15L2.71 17.29A1 1 0 0 0 2.71 18.7L5.29 21.29A1 1 0 0 0 6.71 21.29L11 17H15A1 1 0 0 0 16 16V15H17A1 1 0 0 0 18 14V13H19A1 1 0 0 0 20 12V11H13V12A2 2 0 0 1 11 14H9A2 2 0 0 1 7 12V9Z"
              />
            </svg>
            <svg v-if="data.fight.status == 'Defeat'" class="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
              />
            </svg>

            <p class="mx-3">{{ data.fight.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
