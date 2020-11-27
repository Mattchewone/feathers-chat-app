<template>
  <div class="bg-gray-200">
    <div class="container m-auto flex items-center justify-center h-screen">
      <div class="flex flex-col bg-white w-2/3 h-96 shadow-md rounded px-8 pt-6 pb-8">
        <div>
          <h2 class="font-bold text-center text-lg text-gray-700">Register</h2>
        </div>
        <form @submit.prevent="register" class="flex flex-col h-full justify-around" autocomplete="off">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              class="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="state.user"
              placeholder="Username"
            >
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              class="shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="state.password"
              placeholder="Password"
            >
          </div>

          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
            <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/login">
              Already have an account? Login here
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { reactive } from 'vue'
import client from '../feathers-client'
import { useRouter } from 'vue-router'
import userModel from '../models/user'

const userService = client.service('users')

export const state = reactive({
  user: '',
  password: '',
})
const router = useRouter()

export const register = async () => {
  try {
    await userService.create({
      email: state.user,
      password: state.password
    })
    const { user } = await client.authenticate({
      strategy: 'local',
      email: state.user,
      password: state.password
    })
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
  } catch (err) {
    console.log(err.message)
  }
}
</script>