<template>
  <div>
  <h1>chat</h1>
    <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages">
      </chat-window>    
  </div>
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
        rooms: [
        {
          roomId: 1,
          roomName: 'Room 1',
          unreadCount: 4,
          index: 3,
          lastMessage: {
            content: 'Last message received',
            senderId: 1234,
            username: 'John Doe',
            timestamp: '10:20',
            saved: true,
            distributed: false,
            seen: false,
            new: true
          },
          users: [
            {
              _id: 1234,
              username: 'John Doe',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            },
            {
              _id: 4321,
              username: 'John Snow',
              avatar: 'assets/imgs/snow.png',
              status: {
                state: 'offline',
                lastChanged: '14 July, 20:00'
              }
            }
          ],
        }
      ],
        messages: [
        {
          _id: 7890,
          indexId: 12092,
          content: 'Wanna play pong?',
          senderId: 1234,
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20',
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          deleted: false,
          failure: true,
          disableActions: false,
          disableReactions: false,
        },
        {
          _id: 7891,
          indexId: 12092,
          content: 'No go away',
          senderId: 1235,
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20',
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          deleted: false,
          failure: true,
          disableActions: false,
          disableReactions: false,
        },
        ],
        currentUserId: 1234
      }
    }
  }
</script>