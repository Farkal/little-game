<script>
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import Logout from './Logout.vue'

const navigation = [{ title: 'My Heros', link: 'heros' }]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Logout,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      open,
    }
  },
}
</script>
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h8 w-8"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDkzLjk3OCA0OTMuOTc4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTMuOTc4IDQ5My45Nzg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTkyLjQ0MiwxMjAuMTU5aDEwNS4yOHYyNC4wOGgtMTA1LjI4VjEyMC4xNTl6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQjdBRTlGOyIgZD0iTTI0NS43MjIsMjIxLjU5OXYtNzcuMzZoMzQuODhsNC44LDg1LjM2TDI0NS43MjIsMjIxLjU5OXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGMDkwNTI7IiBkPSJNMjI0LjY4Miw4NC4zOTloNDIuMDh2MzQuNGgtNDIuMDhWODQuMzk5eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGMDkwNTI7IiBkPSJNMjI0LjY4Miw0OC4zOTl2LTE5LjM2YzAuMDAxLTExLjYyLDkuNDIxLTIxLjAzOSwyMS4wNDEtMjEuMDM5DQoJCWMxMS42MTksMC4wMDEsMjEuMDM4LDkuNDIsMjEuMDM5LDIxLjAzOXYxOS4zNkgyMjQuNjgyeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGMDkwNTI7IiBkPSJNMjI0LjY4Miw0OC4zOTloNDIuMDh2MzZoLTQyLjA4VjQ4LjM5OXoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQ0MwMEY7IiBkPSJNMjg4LjIwMiwyODEuMTE5bDM4LjY0LDcuNzZsLTM2LjE2LDM2LjQ4TDI4OC4yMDIsMjgxLjExOXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNCN0FFOUY7IiBkPSJNMjA2Ljg0MiwyMTMuODM5bDMuOTItNjkuNmgzNC45NnY3Ny40NEwyMDYuODQyLDIxMy44Mzl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0I3QUU5RjsiIGQ9Ik0xOTQuODQyLDQzMC4xNTlsNC03Mi40bDk0LjcyLDE5LjA0bDIuOTYsNTMuMzZsLTUwLjgsNTYuMDhMMTk0Ljg0Miw0MzAuMTU5eiIvPg0KPC9nPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZDQzAwRjsiIGQ9Ik0xNjcuNDgyLDM1MS40Mzl2LTUwLjg4bDIxNS43Niw0My40NGwtMTkuMjgsMjIuNGwyMy4zNiwyOS4yOEwxNjcuNDgyLDM1MS40Mzl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZDQzAwRjsiIGQ9Ik0xMTEuMDgyLDI0NS40MzlsMTkuMjgtMjIuNDhsLTIzLjM2LTI5LjI4bDIxOS44NCw0NC4zMnY1MC44OEwxMTEuMDgyLDI0NS40Mzl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZDQzAwRjsiIGQ9Ik0xNjcuNDgyLDMwMC41NTlsMzYuNTYtMzYuNGwtMi40LDQzLjI4TDE2Ny40ODIsMzAwLjU1OXoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNCN0FFOUY7IiBkPSJNMjQ1LjcyMiwzMTYuMzE5di00My43Nmw0Mi40OCw4LjU2bDIuNDgsNDQuMjRMMjQ1LjcyMiwzMTYuMzE5eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNCN0FFOUY7IiBkPSJNMjAxLjY0MiwzMDcuNDM5bDIuNC00My4yOGw0MS42OCw4LjR2NDMuNzZMMjAxLjY0MiwzMDcuNDM5eiIvPg0KPC9nPg0KPHBhdGggc3R5bGU9ImZpbGw6IzNBMzAyQjsiIGQ9Ik0zNzQuMzYyLDM2Ni42MzlsMTQuOTYtMTcuNDRjMi44NzMtMy4zNTcsMi40OC04LjQwNy0wLjg3Ny0xMS4yOA0KCWMtMS4wMzItMC44ODMtMi4yNzItMS40ODktMy42MDMtMS43NmwtNzgtMTZsMjUuNjgtMjUuOTJjMC4zNzEtMC40NDQsMC42OTMtMC45MjcsMC45Ni0xLjQ0YzAuOTMtMS4xMjEsMS40MTQtMi41NDUsMS4zNi00di01MC44DQoJYzAuMDc4LTMuODYyLTIuNjE1LTcuMjI4LTYuNC04bC0zNS40NC02Ljg4bC0zLjkyLTcwLjhoOS4wNGM0LjQxOCwwLDgtMy41ODIsOC04di0yNS4yYzAtNC40MTgtMy41ODItOC04LThoLTIzLjM2di04Mi4wOA0KCUMyNzQuNzYxLDEzLDI2MS43NTktMC4wMDEsMjQ1LjcyMSwwYy0xNi4wMzcsMC4wMDEtMjkuMDM4LDEzLjAwMS0yOS4wMzksMjkuMDM5djE5LjM2djM2djI2LjcyaC0yMy40NGMtNC40MTgsMC04LDMuNTgyLTgsOHYyNS40NA0KCWMwLDQuNDE4LDMuNTgyLDgsOCw4aDkuMDRsLTMuMTIsNTEuNmwtOTAuNTYtMTguMzJjLTQuMzExLTAuOTY3LTguNTksMS43NDUtOS41NTYsNi4wNTZjLTAuNTMxLDIuMzY4LDAuMDQyLDQuODQ4LDEuNTU2LDYuNzQ0DQoJbDE5LjIsMjRsLTE0Ljk2LDE3LjQ0Yy0yLjg3MywzLjM1Ny0yLjQ4LDguNDA3LDAuODc3LDExLjI4YzEuMDMyLDAuODgzLDIuMjcyLDEuNDg5LDMuNjAzLDEuNzZsNzguMzIsMTZsLTI1Ljc2LDI2DQoJYy0wLjQwNCwwLjQ2NS0wLjc1MywwLjk3NS0xLjA0LDEuNTJjLTAuMjM2LDAuMzA0LTAuNDUsMC42MjUtMC42NCwwLjk2Yy0wLjQ1OCwxLjAwNS0wLjcwNCwyLjA5NS0wLjcyLDMuMnY1MC4zMg0KCWMtMC4wNzgsMy44NjIsMi42MTUsNy4yMjgsNi40LDhsMjQuNTYsNC45NmwtMy42OCw2NS40NGMtMC4xMiwyLjE0NywwLjYzLDQuMjUyLDIuMDgsNS44NGw1MC44LDU2DQoJYzIuOTcyLDMuMjcsOC4wMzEsMy41MTEsMTEuMzAxLDAuNTM5YzAuMTg4LTAuMTcxLDAuMzY4LTAuMzUxLDAuNTM5LTAuNTM5bDUwLjgtNTZjMS40NS0xLjU4OCwyLjItMy42OTMsMi4wOC01Ljg0bC0yLjQtNDIuOTYNCglsODMuNiwxNi44aDEuNmM0LjQxOC0wLjAyLDcuOTgzLTMuNjE4LDcuOTYzLTguMDM3Yy0wLjAwOC0xLjc4OC0wLjYxNS0zLjUyMS0xLjcyMy00LjkyM0wzNzQuMzYyLDM2Ni42Mzl6IE0yOTcuNzIyLDMwNi45NTkNCglsLTAuODgtMTZsMTMuOTIsMi44TDI5Ny43MjIsMzA2Ljk1OXogTTIzMi42ODIsMjkuMDM5YzAuMDA3LTcuMjAyLDUuODUxLTEzLjAzNCwxMy4wNTMtMTMuMDI3DQoJYzcuMTkyLDAuMDA3LDEzLjAyLDUuODM1LDEzLjAyNywxMy4wMjd2MTEuMzZoLTI2LjA4TDIzMi42ODIsMjkuMDM5eiBNMjMyLjY4Miw1Ni4zOTloMjYuMDh2MjBoLTI2LjA4TDIzMi42ODIsNTYuMzk5eg0KCSBNMjMyLjY4Miw5Mi4zOTloMjYuMDh2MTguNzJoLTI2LjA4TDIzMi42ODIsOTIuMzk5eiBNMjAxLjMyMiwxMzYuMjM5di05LjEyaDg4Ljh2OS40NEwyMDEuMzIyLDEzNi4yMzl6IE0yNzYuODQyLDIxOS43NTkNCglsLTIzLjEyLTQuNjR2LTYyLjg4aDE5LjM2TDI3Ni44NDIsMjE5Ljc1OXogTTIzNy43MjIsMTUyLjIzOXY1OS42OGwtMjIuNTYtNC44bDMuMDQtNTUuMTJMMjM3LjcyMiwxNTIuMjM5eiBNMTI1LjcyMiwyNDAuMjM5DQoJbDEwLjQtMTIuMDhjMi40NzEtMi45NjYsMi40NzEtNy4yNzQsMC0xMC4yNGwtOC45Ni0xMmwxOTIsMzguNjR2MzQuNTZMMTI1LjcyMiwyNDAuMjM5eiBNMjgxLjgwMiwzMTUuNDM5bC0yOC40OC01Ljc2di0yNy4zNg0KCWwyNi44OCw1LjQ0TDI4MS44MDIsMzE1LjQzOXogTTIzNy43MjIsMjc5LjExOXYyNy40NGwtMjcuNjgtNS42bDEuNTItMjcuMTJMMjM3LjcyMiwyNzkuMTE5eiBNMTk0LjkyMiwyODQuNTU5bC0wLjcyLDEzLjINCglsLTEwLjQtMi4wOEwxOTQuOTIyLDI4NC41NTl6IE0yNDUuNzIyLDQ3NC4zMTlsLTQyLjY0LTQ3LjEybDMuMjgtNjAuMDhsNzkuNiwxNmwyLjQsNDMuODRMMjQ1LjcyMiw0NzQuMzE5eiBNMzU3LjcyMiwzNzEuMzU5DQoJbDkuNDQsMTIuMTZsLTE5Mi0zOC42NHYtMzQuNTZsMTkyLjgsMzguOGwtMTAuNCwxMi4wOGMtMi40MjUsMy4wMDUtMi4zNTcsNy4zMTMsMC4xNiwxMC4yNFYzNzEuMzU5eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
              alt="Little game"
            />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <template v-for="(item, itemIdx) in navigation" :key="item">
                <template v-if="itemIdx === 0">
                  <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                  <router-link
                    :to="{ name: item.link }"
                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >{{ item.title }}</router-link
                  >
                </template>
                <router-link
                  v-else
                  :to="{ name: item.link }"
                  class="
                    text-gray-300
                    hover:bg-gray-700
                    hover:text-white
                    px-3
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                  "
                  >{{ item.title }}</router-link
                >
              </template>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <Logout />
            <img
              class="h-10 w-10 ml-3 rounded-full"
              src="https://image.flaticon.com/icons/png/512/149/149071.png"
              alt=""
            />
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="
              bg-gray-800
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white
              hover:bg-gray-700
              focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!open"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <template v-for="(item, itemIdx) in navigation" :key="item">
          <template v-if="itemIdx === 0">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <router-link
              :to="{ name: item.link }"
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              >{{ item.title }}</router-link
            >
          </template>
          <router-link
            v-else
            :to="{ name: item.link }"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >{{ item.title }}</router-link
          >
        </template>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://image.flaticon.com/icons/png/512/149/149071.png"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">Tom Cook</div>
          </div>
          <Logout class="ml-auto" />
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
