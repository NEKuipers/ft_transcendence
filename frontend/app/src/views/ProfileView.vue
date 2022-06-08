<template>
  <div class="profile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
      <h1 v-if="users">{{users[0].userName}}</h1>
      <h1 v-else>Loading...</h1>
      <h3 v-if="users">{{users[0].firstName}} {{users[0].lastName}}</h3>
      <h3 v-else>Loading...</h3>
    </section>
    <section class="game-stats">
      <div v-if="users">
        <h4>Games played: {{users[0].gamesPlayed}}</h4>
        <h4>Games won: {{users[0].gamesWon}}</h4>
        <h4>Games lost: {{users[0].gamesLost}}</h4>
      </div>
      <div v-else>
        <h4>Games played: 0</h4>
        <h4>Games won: 0</h4>
        <h4>Games lost: 0</h4>
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
      users: null,
    }
  },
  mounted() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => this.users = data)
    .catch(err => console.log(err));
  },
  components: {
    // SmallButton,
  },
  methods: {
    logUsers() {
      console.log(this.users);
    }
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