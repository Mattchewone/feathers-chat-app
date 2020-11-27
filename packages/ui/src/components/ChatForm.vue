<template>
  <form class="flex h-full" @submit.prevent="sendMessage">
    <input class="flex-1 h-full px-5 shadow appearance-none border rounded py-4 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="message" placeholder="Enter message">

    <button
      class="h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      :disabled="!message"
    >
      Send
    </button>
  </form>
</template>

<script setup="props, { emit }">
import { ref } from 'vue'

export const message = ref('')

export const sendMessage = () => {
  const value = message.value
  if (!value || value === '') {
    return
  }
  emit('send-message', value)

  message.value = ''
}
</script>