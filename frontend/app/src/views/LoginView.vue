<template>
  <div class="home">
    <h1>Login required</h1>
    <img height="300" width="300" alt="pingpong" src="../assets/atari-joystick.jpg">
    <br>
    <button @click="OAuthLogin">Login to Intra</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginStatusStore } from '../stores/profileData'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  methods: {
    OAuthLogin(e: Event) {
      // window.location.href = '/api/login'
      fetch('/api/login')
      .then(res => res.json())
      .then(data => console.log(data))
      const store = loginStatusStore()

    }
  },
});
</script>