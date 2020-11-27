import { createRouter, createWebHistory } from 'vue-router'
import Messages from './pages/Messages.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'chat', path: '/room/:roomName', component: Messages, props: true },
    { name: 'login', path: '/login', component: Login },
    { name: 'register', path: '/register', component: Register}
  ]
})