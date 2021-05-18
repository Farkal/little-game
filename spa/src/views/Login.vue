<script lang="ts">
import { useMutation } from '@urql/vue'
enum Mode {
  Login,
  Create,
}
export default {
  data() {
    return {
      authError: '',
      mode: Mode.Login,
      username: '',
      password: '',
      Mode,
    }
  },
  setup() {
    const { executeMutation: createUser } = useMutation(`
      mutation ($username: String!, $password: String!) {
        createUser (username: $username, password: $password) {
            id
          }
      }
    `)
    const { executeMutation: login } = useMutation(`
      mutation ($username: String!, $password: String!) {
        login (username: $username, password: $password)
      }
    `)

    return { createUser, login }
  },
  computed: {
    actionText() {
      return this.mode == Mode.Login ? 'Login' : 'Create'
    },
  },
  methods: {
    async loginOrCreate() {
      this.authError = ''
      console.log(this.username, this.password, this.mode)
      const variables = { username: this.username, password: this.password }
      if (this.mode === Mode.Login) {
        const res = await this.login(variables)
        if (res.data) {
          this.$auth.isLoggedIn = true
          this.$auth.token = res.data.login
          this.$router.push({ name: 'heros' })
        } else {
          // TODO: Manage duplicated username error
          this.authError = 'Wrong username or password'
        }
      }
    },
  },
}
</script>
<template>
  <div class="col-span-12 flex inline-flex mt-2 mr-2" role="group">
    <button
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-5
        bg-blue-500
        rounded-l-md
        hover:bg-blue-600
        hover:shadow-lg
      "
      :class="{ 'bg-blue-700': mode == Mode.Login }"
      @click="mode = Mode.Login"
    >
      Login
    </button>
    <button
      type="button"
      class="
        focus:outline-none
        text-white text-sm
        py-2.5
        px-5
        bg-blue-500
        rounded-r-md
        hover:bg-blue-600
        hover:shadow-lg
      "
      :class="{ 'bg-blue-700': mode == Mode.Create }"
      @click="mode = Mode.Create"
    >
      Create Account
    </button>
  </div>
  <form class="col-span-12" @submit.prevent="loginOrCreate">
    <div>
      <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
      <input
        v-model="username"
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
    </div>

    <div>
      <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
      <input
        v-model="password"
        type="password"
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
    </div>

    <div
      v-show="authError"
      class="flex w-full mt-4 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div class="flex items-center justify-center w-12 bg-red-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
          />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
          <p class="text-sm text-gray-600 dark:text-gray-200">{{ authError }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <button
        type="submit"
        class="
          focus:outline-none
          text-white text-sm
          py-2.5
          px-5
          rounded-md
          bg-blue-500
          hover:bg-blue-600
          hover:shadow-lg
        "
      >
        {{ actionText }}
      </button>
    </div>
  </form>
</template>
<style>
.bg-image {
  background-image: url(https://i.postimg.cc/13pssvxG/bg-image.png);
}
.backdrop {
  backdrop-filter: blur(2px);
}
</style>
