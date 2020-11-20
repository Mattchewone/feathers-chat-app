<template>
  <div>
    <router-view>
    </router-view>
  </div>
</template>

<script setup>
import userModel from './models/user'
import client from './feathers-client'
import router from './router'

client.reAuthenticate().then(({ user: _user }) => {
  userModel.user = _user
}).catch(err => {
  console.log(err.message)
  // Redirect to the login page!
  router.push('/login')
})
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
