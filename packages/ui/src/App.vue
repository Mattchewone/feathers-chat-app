<template>
  <div>
    <router-view>
    </router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import userModel from './models/user'
import client from './feathers-client'

const router = useRouter()

client.reAuthenticate().then(({ user }) => {
  userModel.user = user
  let room
  try {
    const storageRoom = localStorage.getItem('room')
    if (storageRoom != 'null' && storageRoom != 'undefined') {
      room = storageRoom
    } else {
      room = user.rooms[0].name
      localStorage.setItem('room', room)
    }
  } catch (err) {
    console.error(err)
  }

  router.push({
    name: 'chat',
    params: {
      roomName: room
    }
  })
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
