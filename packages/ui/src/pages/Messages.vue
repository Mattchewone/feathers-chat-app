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
          {{room.name}}
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
import userModel from '../models/user'
import client from '../feathers-client'

export { default as ChatHistory } from '../components/ChatHistory'
export { default as ChatForm } from '../components/ChatForm'

const messageService = client.service('messages')

function handleScroll () {
  const el = document.querySelector('.chat__messages')
  el.scrollTop = el.scrollHeight
}

export const state = reactive({
  message: '',
  messages: [],
  rooms: []
})

async function setup () {
  const { data } = await messageService.find({
    query: {
      $sort: {
        createdAt: -1
      }
    }
  })
  state.messages = data
}
setup()

// Find all rooms for user
watchEffect(() => {
  state.rooms = userModel.user.rooms
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
      body: message
    })
  } catch (err) {
    console.log(err.message)
  }
}
</script>
