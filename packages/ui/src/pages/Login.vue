<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="state.user" placeholder="Enter your username.">
      <input type="password" v-model="state.password" placeholder="Enter your password">
      <button type="submit">Login</button>
    </form>

    <p>No account, register <router-link to="/register">here</router-link></p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import router from '../router'
import client from '../feathers-client'

export const state = reactive({
  user: '',
  password: '',
})

export const login = async () => {
  try {
    await client.authenticate({
      strategy: 'local',
      email: state.user,
      password: state.password
    })
    router.push('/')
  }catch (err) {
    console.log(err.message)
  }
}
</script>