<script lang="ts">
export default {
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
        <div
          class="h-6 px-2 flex justify-items-center text-green-600 font-semibold text-sm relative"
        >
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
            <svg
              class="h-5 w-5 ml-2 text-black"
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
            <p>{{ hero.magik }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="inline-block mr-2 mt-2">
          <button
            type="button"
            class="
              focus:outline-none
              text-yellow-600 text-xs
              py-2
              px-4
              rounded-md
              border border-yellow-600
              hover:bg-yellow-50
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
