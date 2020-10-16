<template>
  <div>
    <form @submit.prevent="register">
      <input type="text" v-model="state.user" placeholder="Enter your username.">
      <input type="password" v-model="state.password" placeholder="Enter your password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import client from '../feathers-client'
import router from '../router'

const userService = client.service('users')

export const state = reactive({
  user: '',
  password: '',
})

export const register = async () => {
  try {
    await userService.create({
      email: state.user,
      password: state.password
    })
    await client.authenticate({
      strategy: 'local',
      email: state.user,
      password: state.password
    })
    router.push('/')
  } catch (err) {
    console.log(err.message)
  }
}
</script>