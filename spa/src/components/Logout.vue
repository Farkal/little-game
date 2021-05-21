<script lang="ts">
export default {
  methods: {
    logout() {
      this.$auth.token = ''
      this.$auth.isLoggedIn = false
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<template>
  <button
    @click="logout"
    class="
      bg-gray-800
      p-1
      rounded-full
      text-gray-400
      hover:text-white
      focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
    "
  >
    <span class="sr-only">Logout</span>
    <svg
      class="h-6 w-6 text-white"
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
      <path d="M7 6a7.75 7.75 0 1 0 10 0" />
      <line x1="12" y1="4" x2="12" y2="12" />
    </svg>
  </button>
</template>
