<template>
  <div class="wrapper">
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

    <div class="chat">
      <ul class="chat__messages">
        <li
          v-for="(message, index) in state.messages"
          :key="index"
          class="chat__message"
        >
          <span class="message-name">{{message.name}}</span> {{message.body}}
        </li>
      </ul>

      <form class="chat__form" @submit.prevent="sendMessage">
        <input class="chat__input" type="text" v-model="state.message" placeholder="Enter message">

        <button
          class="chat__btn"
          type="submit"
          :disabled="!state.message"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup="props, { attrs }">
import { reactive, watchEffect } from 'vue'
import client from '../feathers-client'

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

  // Find all rooms for user
  watchEffect(() => {
    state.rooms = attrs.user.rooms
  })
}
setup()

messageService.on('created', (message) => {
  state.messages.unshift(message)
  setTimeout(() => {
    handleScroll()
  }, 10)
})

export const sendMessage = async () => {
  if (!state.message || state.message === '') {
    return
  }
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

<style lang="scss">
  .wrapper {
    display: grid;
    grid-template-columns: 30% 70%;
    height: 100vh;
  }

  .chat {
    background-color: grey;
    display: grid;
    grid-template-rows: 95vh 5vh;

    &__messages {
      margin: 0;
      padding: .2rem;
      list-style: none;
      overflow: scroll;
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column-reverse;
    }

    &__message {
      margin: .3rem 0;
      padding: .2rem 0;
    }

    .message-name {
      padding: .1rem .2rem;
      border: 1px solid red;
      border-radius: 2px;
    }

    &__form {
      width: 100%;
    }

    &__input {
      border: none;
      margin: 0;
      padding: 0;
      width: 80%;
      height: 100%;
      font-size: 1rem;
    }

    &__input::-webkit-input-placeholder {
      padding: 0 .5rem;
    }

    &__btn {
      border: none;
      margin: 0;
      padding: 0;
      width: 20%;
      height: 100%;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
  .rooms {
    background-color: blue;
  }
</style>