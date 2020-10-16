<template>
  <div>
    <h1>Feathers Chat App</h1>

    <router-view></router-view>
  </div>
</template>

<script setup>
import client from './feathers-client'
import router from './router'

client.reAuthenticate().then().catch(err => {
  console.log(err.message)
  // Redirect to the login page!
  router.push('/login')
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
