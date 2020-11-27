<template>
  <router-link
    :to="`/room/${room.name}`"
    custom
    v-slot="{ href, navigate, isActive }"
  >
    <a
      :href="href"
      @click="navigate"
      class="bg-gray-200 p-2 block hover:bg-gray-400 cursor-pointer rounded-full text-sm font-semibold text-gray-700 mb-2"
      :class="{ 'border-4 border-blue-800': isActive }"
    >
      #{{room.name}}
    </a>
  </router-link>
</template>

<script setup="props">
import { computed } from 'vue'

export default {
  props: {
    room: {
      type: Object,
      default: () => ({})
    },
  },
  inheritAttrs: false,
}

export const room = computed(() => props.room)
</script>