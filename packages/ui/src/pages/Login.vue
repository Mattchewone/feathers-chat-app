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
import userModel from '../models/user'
import router from '../router'
import client from '../feathers-client'

export const state = reactive({
  user: '',
  password: '',
})

export const login = async () => {
  try {
    const { user } = await client.authenticate({
      strategy: 'local',
      email: state.user,
      password: state.password
    })
    userModel.user = user
    router.push({ path: '/' })
  }catch (err) {
    console.log(err.message)
  }
}
</script>