<script lang="ts">
export default {
  props: ['hero'],
}
</script>
<template>
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
      <span class="flex items-center">lvl {{ hero.level }}</span>
    </div>
    <div class="h-6 px-2 flex justify-items-center text-green-600 font-semibold text-sm relative">
      <span class="flex items-center">{{ hero.rank }}</span>
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
  <div class="ml-2 w-full flex-1">
    <div>
      <div class="mt-3 text-3xl font-bold leading-8">{{ hero.name }}</div>

      <div class="mt-1 flex items-center">
        <svg class="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <p>{{ hero.health }}</p>
        <svg
          class="h-5 w-5 ml-2 text-black"
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
        <p>{{ hero.attack }}</p>
        <svg
          class="h-5 w-5 ml-2 text-black"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <p>{{ hero.defense }}</p>
        <svg class="h-5 w-5 ml-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        <p>{{ hero.magik }}</p>
      </div>
    </div>
  </div>
</template>
