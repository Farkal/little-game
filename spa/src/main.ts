import { createApp, reactive } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import urql from '@urql/vue'
import { makeOperation } from '@urql/core'
import { authExchange } from '@urql/exchange-auth'
import App from './App.vue'
// import Login from './views/Login.vue'
import Heros from './views/Heros.vue'
import './index.css'

const routes = [
  { path: '/', name: 'heros', component: Heros },
  { path: '/login', name: 'login', component: () => import('./views/Login.vue') },
  {
    path: '/hero/:id',
    name: 'hero',
    component: () => import('./views/HeroDetails.vue'),
    props: true,
  },
  {
    path: '/fight/:id',
    name: 'fight',
    component: () => import('./views/Fight.vue'),
    props: true,
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)
app.config.globalProperties.$auth = reactive({ isLoggedIn: false, token: '' })
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !app.config.globalProperties.$auth.isLoggedIn) next({ name: 'login' })
  else next()
})
app.use(router)

// Graphql
app.use(urql, {
  requestPolicy: 'network-only',
  url: 'http://localhost:3020/graphql',
  fetchOptions: () => {
    const token = app.config.globalProperties.$auth.token
    return {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    }
  },
})
app.mount('#app')
