<template>
  <h1>chat</h1>
    <chat-window
      :current-user-id="1233"
      :rooms=[]
      :messages=[]>
      </chat-window>    
</template>

<script lang="ts">
  import ChatWindow from 'vue-advanced-chat'
  import 'vue-advanced-chat/dist/vue-advanced-chat.css'  
  export default {
    components: {
      ChatWindow
    },
    data() {
      return {
        rooms: [],
        messages: [],
        currentUserId: 1234
      }
    }
  }
</script>