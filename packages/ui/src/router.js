import { createRouter, createWebHistory } from 'vue-router'
import Messages from './pages/Messages.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Messages },
    { path: '/login', component: Login },
    { path: '/register', component: Register}
  ]
})