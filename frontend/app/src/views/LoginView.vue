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
    OAuthLogin(e: Event) {
      // let bruh: string
      // e.preventDefault()
      window.location.href = '/api/login'
      // fetch('/api/login', {
      //   // headers: {
      //   //   'Access-Control-Allow-Origin': 'https://intra.42.fr'
      //   // }
      // })
      // .then(res => res.text())
      // .then(data => {console.log('Come on man');})
      // .catch(error => {
      //   console.log(error)
      //   bruh = 'https://boia.de'
      // })
      
    }
  },
});
</script>