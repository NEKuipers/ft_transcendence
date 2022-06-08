<template>
  <div class="profile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
      <h1 v-if="user">{{user.userName}}</h1>
      <h1 v-else>Loading...</h1>
      <h3 v-if="user">{{user.firstName}} {{user.lastName}}</h3>
      <h3 v-else>Loading...</h3>
    </section>
    <section class="game-stats">
      <div v-if="user">
        <h4>Games played: {{user.gamesPlayed}}</h4>
        <h4>Games won: {{user.gamesWon}}</h4>
        <h4>Games lost: {{user.gamesLost}}</h4>
      </div>
      <div v-else>
        <h4>Games played: </h4>
        <h4>Games won: </h4>
        <h4>Games lost: </h4>
      </div>
    </section>
  </div>
</template>


<style>
.profilePicture {
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20%;
  height: 200px;
  width: 200px;
  border: solid;
  border-width: 3px;
}

</style>

<script lang="ts">

import { defineComponent } from 'vue';


export default defineComponent({
  name: 'ProfileView',
  props: {
    },
  data () {
    return {
      selectedFile: null,
      user: null,
    }
  },
  mounted() {
    let id = '1'; // This variable directs you to various profiles
    fetch('http://localhost:3000/users/' + id)
    .then(res => res.json())
    .then(data => this.user = data)
    .catch(err => console.log(err));
  },
  components: {
    // SmallButton,
  },
  methods: {

  },
});

</script>

<style scoped>

.names {
  margin-top: 0px;
}

.game-stats {
  padding: 0px;
  margin: 0px;
}

.game-stats h4 {
  padding: 0px;
  margin: 5px;
}

</style>