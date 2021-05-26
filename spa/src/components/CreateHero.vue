<script>
import { useMutation } from '@urql/vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  props: {
    open: false,
    name: '',
  },
  emits: ['update:open'],
  setup() {
    const { executeMutation: createHero } = useMutation(`
      mutation ($name: String!) {
        createHero (name: $name) {
            id
          }
      }
    `)
    return { createHero }
  },
  methods: {
    toggleOpen() {
      this.$emit('update:open', !this.open)
    },
    async createHero() {
      const res = await this.createHero({ name: this.name })
      if (res && res.data) {
        this.$emit('update:open', false)
      }
    },
  },
}
</script>
<template>
  <Popover v-model="open" class="relative">
    <PopoverButton
      @click="toggleOpen"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-5
        rounded-md
        border
        bg-green-600
        hover:bg-green-500
        flex
        items-center
      "
      >Create Hero
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>
    </PopoverButton>

    <PopoverPanel
      v-if="open"
      static
      class="absolute z-10 bg-gray-300 p-4 rounded-md w-screen mt-3 max-w-sm right-1"
    >
      <form @submit.prevent="createHero">
        <label class="text-gray-700 dark:text-gray-200" for="username">Hero name:</label>
        <input
          v-model="name"
          type="text"
          class="
            block
            w-full
            px-4
            py-2
            mt-2
            text-gray-700
            bg-white
            border border-gray-300
            rounded-md
            dark:bg-gray-800
            dark:text-gray-300
            dark:border-gray-600
            focus:border-blue-500
            dark:focus:border-blue-500
            focus:outline-none
            focus:ring
          "
        />
        <button
          type="submit"
          class="
            mt-2
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
          Create
        </button>
      </form>
    </PopoverPanel>
  </Popover>
</template>
