<template>
  <div>
    <h2 class="font-bold text-xl mb-2 text-white text-center">Rooms</h2>

    <RoomListItem
      v-for="room in rooms"
      :key="room._id"
      :room="room"
      class="mb-2"
    />
  </div>
</template>

<script setup="props">
import { computed } from 'vue'

export { default as RoomListItem } from './RoomListItem'

export default {
  props: {
    rooms: {
      type: Array,
      default: () => []
    },
  },
  inheritAttrs: false,
}

export const rooms = computed(() => props.rooms)
</script>