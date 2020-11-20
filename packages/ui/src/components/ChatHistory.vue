<template>
  <ul class="chat__messages flex flex-col-reverse h-full overflow-y-scroll">
    <li
      v-for="(message, index) in messages"
      :key="index"
      class="flex bg-white rounded my-1 p-2 items-center"
    >
      <div class="flex flex-none font-bold bg-gray-300 rounded-full h-14 w-14 items-center justify-center mr-4">{{message.name}}</div> {{message.body}}
    </li>
  </ul>
</template>

<script setup="props">
import { computed } from 'vue'

export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    },
  },
  inheritAttrs: false,
}

export const messages = computed(() => props.messages)
</script>

<style lang="css">
  .chat__messages {
    scroll-behavior: smooth;
  }
</style>