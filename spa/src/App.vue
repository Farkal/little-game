<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      username: 'titou',
      isSideMenuOpen: false,
      toto: false,
    }
  },
  computed: {
    menu() {
      return [
        { title: 'My Heros', icon: 'lightning-bolt', link: 'heros' },
      ]
    },
  },
  methods: {
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
    closeSideMenu() {
      this.isSideMenuOpen = false
    },
  },
})
</script>
<template>
  <div class="flex h-screen bg-gray-800" :class="{ 'overflow-hidden': isSideMenuOpen }">
    <!-- Desktop sidebar -->
    <aside class="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 md:block">
      <div>
        <div class="text-white">
          <div class="flex p-2 bg-gray-800 py-3 justify-center">
            <p class="text-2xl text-center text-green-500 font-semibold">Little Game</p>
          </div>
          <div v-show="$auth.isLoggedIn" class="flex justify-center">
            <div class="">
              <img
                class="
                  hidden
                  h-24
                  w-24
                  rounded-full
                  sm:block
                  object-cover
                  mr-2
                  border-4 border-green-400
                "
                src="https://image.flaticon.com/icons/png/512/149/149071.png"
                alt=""
              />
              <p class="font-bold text-base text-gray-400 pt-2 text-center w-24">{{ username }}</p>
            </div>
          </div>
          <div v-show="$auth.isLoggedIn">
            <ul class="mt-6 leading-10">
              <li v-for="item in menu" class="relative px-2 py-1">
                <router-link
                  class="
                    inline-flex
                    items-center
                    w-full
                    text-sm
                    font-semibold
                    text-white
                    transition-colors
                    duration-150
                    cursor-pointer
                    hover:text-green-500
                  "
                  :to="{name: item.link}"
                >
                  <svg
                    v-if="item.icon == 'lightning-bolt'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-if="item.icon == 'fire'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="ml-4">{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile sidebar -->
    <!-- Backdrop -->
    <div
      v-show="isSideMenuOpen && $auth.isLoggedIn"
      x-transition:enter="transition ease-in-out duration-150"
      x-transition:enter-start="opacity-0"
      x-transition:enter-end="opacity-100"
      x-transition:leave="transition ease-in-out duration-150"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
      class="
        fixed
        inset-0
        z-10
        flex
        items-end
        bg-black bg-opacity-50
        sm:items-center
        sm:justify-center
      "
    ></div>

    <aside
      class="
        fixed
        inset-y-0
        z-20
        flex-shrink-0
        w-64
        mt-16
        overflow-y-auto
        bg-gray-900
        dark:bg-gray-800
        md:hidden
      "
      v-show="isSideMenuOpen && $auth.isLoggedIn"
      x-transition:enter="transition ease-in-out duration-150"
      x-transition:enter-start="opacity-0 transform -translate-x-20"
      x-transition:enter-end="opacity-100"
      x-transition:leave="transition ease-in-out duration-150"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0 transform -translate-x-20"
      @click.away="closeSideMenu"
      @keydown.escape="closeSideMenu"
    >
      <div>
        <div class="text-white">
          <div class="flex justify-center p-2 py-3 bg-gray-800">
            <p class="text-2xl text-center text-green-500 font-semibold">Little Game</p>
          </div>
          <div>
            <ul class="mt-6 leading-10">
              <li v-for="item in menu" class="relative px-2 py-1">
                <a
                  class="
                    inline-flex
                    items-center
                    w-full
                    text-sm
                    font-semibold
                    text-white
                    transition-colors
                    duration-150
                    cursor-pointer
                    hover:text-green-500
                  "
                  href=" #"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span class="ml-4">{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    <div class="flex flex-col flex-1 w-full overflow-y-auto">
      <header class="z-40 py-4 bg-gray-800">
        <div v-show="$auth.isLoggedIn" class="flex items-center justify-between h-8 px-6 mx-auto">
          <!-- Mobile hamburger -->
          <button
            class="
              p-1
              mr-5
              -ml-1
              rounded-md
              md:hidden
              focus:outline-none
              focus:shadow-outline-purple
            "
            @click="toggleSideMenu"
            aria-label="Menu"
          >
            <x-heroicon-o-menu class="w-6 h-6 text-white" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
      </header>
      <main class="">
        <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
          <div class="grid grid-cols-12 gap-6">
            <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <router-view />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
