<template>
  <div class="home">
    <h1>You have to login</h1>
    <img alt="pingpong" src="../assets/logo.png">
    <hr>
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