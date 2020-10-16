<template>
  <div>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="state.message" placeholder="Enter message">

      <button type="submit">Send</button>
    </form>

    <ul>
      <li v-for="(message, index) in state.messages" :key="index">{{message.name}} - {{message.body}}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import client from '../feathers-client'

const messageService = client.service('messages')

export const state = reactive({
  message: '',
  messages: []
})

async function setup () {
  const { data } = await messageService.find()
  state.messages = data
}
setup()

messageService.on('created', (message) => {
  state.messages.push(message)
})

export const sendMessage = async () => {
  try {
    await messageService.create({
      body: state.message
    })

    state.message = ''
  } catch (err) {
    console.log(err.message)
  }
}
</script>