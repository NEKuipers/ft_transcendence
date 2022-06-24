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

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  methods: {
    OAuthLogin() {
      console.log("Attempt to login")
      // fetch("https://api.intra.42.fr/oauth/authorize", {
      //   method: 'GET',
      //   body: JSON.stringify({
      //     'client_id': 1323232,
      //     'redirect_uri': 'http://localhost:8080/',
      //     'scope': 'public',
      //     'state': 'true',
      //     'response_type': 'code'
      //   })
      // })
    }
  }
});
</script>