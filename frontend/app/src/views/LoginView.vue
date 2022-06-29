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
      let bruh: string
      fetch('/api/login')
      .then(res => res.text())
      .then(data => {console.log('Come on man');})
      .catch(error => {
        console.log(error)
        bruh = 'https://boia.de'
      })
      // const client_id = process.env.VUE_APP_CLIENTID
      // console.log('client id is: ' + client_id)
      // window.location.href = bruh
      // window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=' + process.env.CLIENT_ID 
      //   + '&redirect_uri=' + 'http://localhost:3030/callback' + '&scope=public&state=authstate&response_type=code'
      // this.$router.push({name: 'intraAuth', params: {
      //   client_id: process.env.CLIENT_ID,
      //   redirect_uri: 'http://localhost:3030/callback',
      //   scope: 'public',
      //   state: 'auth_state',
      //   response_type: 'code'
      // }})
      
    }
  },
});
</script>