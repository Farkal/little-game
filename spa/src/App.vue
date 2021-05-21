<script lang="ts">
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar,
  },
  data() {
    return {}
  },
  computed: {
    menu() {
      return [{ title: 'My Heros', icon: 'lightning-bolt', link: 'heros' }]
    },
  },
  methods: {},
}
</script>
<template>
  <Navbar v-show="$auth.isLoggedIn" />
  <div class="flex h-screen bg-gray-800">
    <div class="flex flex-col flex-1 w-full overflow-y-auto">
      <main class="mb-4 pb-10 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
        <router-view />
      </main>
    </div>
  </div>
</template>
