<script lang="ts">
export default {
  props: ['current', 'inc', 'icon'],
  emits: ['update:inc'],
  methods: {
    increase() {
      this.$emit('update:inc', +1)
    },
    decrease() {
      this.$emit('update:inc', -1)
    },
  },
}
</script>
<template>
  <div class="flex items-center grid grid-cols-5 md:grid-cols-10">
    <div class="inline-block mr-2 mt-2">
      <svg
        v-if="icon == 'health'"
        class="h-5 w-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <svg
        v-if="icon == 'attack'"
        class="h-5 w-5 text-black"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M3 19l15 -15l3 3l-6 6l2 2a14 14 0 0 1 -14 4" />
      </svg>
      <svg
        v-if="icon == 'defense'"
        class="h-5 w-5 text-black"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <svg
        v-if="icon == 'magik'"
        class="h-5 w-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    </div>
    <div class="inline-block mr-4 mt-2">
      <p>{{ current }}</p>
    </div>
    <div class="inline-block mr-4 mt-2 text-green-600">
      <p>+{{ inc }}</p>
    </div>
    <div class="inline-block mr-4 mt-2">
      <button
        @click="increase"
        type="button"
        class="
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-green-500
          hover:bg-green-600
          hover:shadow-lg
        "
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
    <div class="inline-block mr-4 mt-2">
      <button
        @click="decrease"
        type="button"
        class="
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-red-500
          hover:bg-red-600
          hover:shadow-lg
        "
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
