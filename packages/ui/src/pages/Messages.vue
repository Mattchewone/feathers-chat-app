<template>
  <div class="h-screen flex">
    <SideBar
      :rooms="state.rooms"
      :user="state.user"
      @logout="handleLogout"
    />
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

<script setup="props">
import { reactive, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import userModel from '../models/user'
import client from '../feathers-client'

export { default as SideBar } from '../components/SideBar'
export { default as ChatHistory } from '../components/ChatHistory'
export { default as ChatForm } from '../components/ChatForm'

const route = useRoute()
const router = useRouter()
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
  rooms: [],
  user: {}
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
  state.user = userModel.user
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
export const handleLogout = async () => {
  try {
    await client.logout()
    userModel.user = {}

    // Navigate to login
    router.push('/login')
  } catch (err) {
    console.err(`Failed to logout: ${err.message}`)
  }
}
</script>
