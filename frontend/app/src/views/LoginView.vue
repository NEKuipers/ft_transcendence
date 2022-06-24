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
      fetch('/api/login').then(res  => console.log(res.text()))
      
    }
  }
});
</script>