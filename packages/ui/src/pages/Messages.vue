<template>
  <div class="h-screen flex">
    <div class="w-1/5 bg-gray-500">
    <div class="rooms">
      <h2>Rooms</h2>

      <ul>
        <li
          v-for="room in state.rooms"
          :key="room._id"
        >
          <router-link :to="`/room/${room.name}`">{{room.name}}</router-link>
        </li>
      </ul>
    </div>
    </div>
    <div class="flex flex-1 flex-col bg-gray-300">
      <div class="flex-1 px-4 pt-4 mb-2 overflow-hidden">
        <ChatHistory :messages="state.messages" />
      </div>
      <div class="h-16 bg-gray-200">
        <ChatForm @send-message="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup="props, { attrs }">
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import userModel from '../models/user'
import client from '../feathers-client'

export { default as ChatHistory } from '../components/ChatHistory'
export { default as ChatForm } from '../components/ChatForm'

const route = useRoute()
const messageService = client.service('messages')
const subscriptionService = client.service('subscriptions')
let previousRoom = route.params.roomName

function handleScroll () {
  const el = document.querySelector('.chat__messages')
  el.scrollTop = el.scrollHeight
}

export const state = reactive({
  message: '',
  messages: [],
  rooms: []
})

async function setup (room) {
  const { data } = await messageService.find({
    query: {
      room: room || route.params.roomName,
      $sort: {
        createdAt: -1
      }
    }
  })
  state.messages = data
}

async function configureSubscriptions (room) {
  try {
    await subscriptionService.remove(previousRoom)

    await subscriptionService.create({
      roomName: room
    })
  } catch (err) {
    console.error(`Failed to unsibscribe: ${err.message}`)
  }
}

// Find all rooms for user
watchEffect(() => {
  state.rooms = userModel.user.rooms
})

// Load data for selected rooms
watchEffect(() => {
  const room = route.params.roomName
  // Update localStorage with the current selected room
  try {
    localStorage.setItem('room', room)
  } catch (err) {
    console.error(err)
  }
  setup(room)
  configureSubscriptions(room)
  // Set the previous
  previousRoom = room
})

messageService.on('created', (message) => {
  state.messages.unshift(message)
  setTimeout(() => {
    handleScroll()
  }, 10)
})

export const sendMessage = async (message) => {
  try {
    await messageService.create({
      body: message,
      room: route.params.roomName
    })
  } catch (err) {
    console.log(err.message)
  }
}
</script>
