<script lang="ts">
import { useQuery } from '@urql/vue'
import Hero from '../components/Hero.vue'
import CreateHero from '../components/CreateHero.vue'
import { SEARCH_HEROS } from '../graphql/heros'

export default {
  components: {
    Hero,
    CreateHero,
  },
  data() {
    return {
      createHeroModal: false,
      /* heros: [
        { name: 'toto', level: 10, rank: 3 },
        { name: 'jiji', level: 20, rank: 30 },
      ], */
    }
  },
  setup() {
    const result = useQuery({
      query: SEARCH_HEROS,
    })
    console.log('TOTO', result)

    return {
      // loading: result.fetching,
      data: result.data,
      error: result.error,
    }
  },
  computed: {},
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
  },
}
</script>
<template>
  <div class="mx-8 grid grid-cols-12 gap-6">
    <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
      <div class="col-span-12 mt-2">
        <div class="flex justify-between items-center h-10 intro-y">
          <h2 class="mr-5 text-lg font-medium truncate">My Heros</h2>
          <CreateHero v-model:open="createHeroModal" />
        </div>
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-else-if="data && data.heros" class="grid grid-cols-12 gap-6 mt-5">
          <Hero v-for="hero in data.heros" :hero="hero"></Hero>
        </div>
      </div>
    </div>
  </div>
</template>
