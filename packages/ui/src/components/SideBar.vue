<template>
  <div class="flex flex-col w-1/5 bg-gray-500">
    <div class="p-4 flex-1">
      <RoomList :rooms="rooms" />
    </div>

    <div class="flex flex-col h-20 w-full bg-gray-300">
      <h3 class="font-bold flex-1 w-full h-full flex items-center justify-center">
        Welcome, <span class="italic">{{ user.email }}</span>
      </h3>
      <button
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        @click="$emit('logout')"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup="props">
import { computed } from 'vue'

export { default as RoomList } from './RoomList'

export default {
  props: {
    rooms: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  inheritAttrs: false,
}

export const rooms = computed(() => props.rooms)
export const user = computed(() => {
  console.log(props.user)
  return props.user
})
</script>