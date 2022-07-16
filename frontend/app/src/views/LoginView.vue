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
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  methods: {
    OAuthLogin(e: Event) {
      window.location.href = '/api/login'
      const store = loginStatusStore()
      // const { getLoginStatus: status } = storeToRefs(store) 
      // store.logIn()
      
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