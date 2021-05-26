<script lang="ts">
import HeroInfo from './HeroInfo.vue'
import FightButton from './FightButton.vue'
export default {
  components: {
    HeroInfo,
    FightButton,
  },
  props: ['hero'],
}
</script>
<template>
  <router-link
    class="
      transform
      hover:scale-105
      transition
      duration-300
      shadow-xl
      rounded-lg
      col-span-12
      sm:col-span-6
      xl:col-span-3
      intro-y
      bg-white
    "
    :to="{ name: 'hero', params: { id: hero.id } }"
  >
    <div class="p-5">
      <HeroInfo :hero="hero" />
      <div class="flex justify-between">
        <div class="inline-block mr-2 mt-2">
          <FightButton :id="hero.id" />
        </div>
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
              class="h-4 w-4 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Details
          </button>
        </div>
      </div>
    </div>
  </router-link>
</template>
