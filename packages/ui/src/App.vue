<template>
  <div>
    <router-view
      :user="data.user"
    >
    </router-view>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import client from './feathers-client'
import router from './router'

let _user = reactive({ user: {} })
client.reAuthenticate().then(({ user }) => {
  _user.user = user
}).catch(err => {
  console.log(err.message)
  // Redirect to the login page!
  router.push('/login')
})

export const data = _user
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
