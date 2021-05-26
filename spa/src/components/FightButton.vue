<script lang="ts">
import { useMutation } from '@urql/vue'
export default {
  props: ['id'],
  setup({ id }) {
    const { executeMutation: fight } = useMutation(`
            mutation ($id: String!) {
              startFight (heroId: $id) {
                  id
                }
            }
          `)
    return {
      fight,
    }
  },
  methods: {
    async fight() {
      const variables = { id: this.id }
      const res = await this.fight(variables)
      if (res.data && res.data.startFight) {
        this.$router.push({ name: 'fight', params: { id: res.data.startFight.id } })
      }
    },
  },
}
</script>
<template>
  <button
    @click="fight"
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
</template>
