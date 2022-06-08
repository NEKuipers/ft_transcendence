<template>
  <div class="userprofile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
      <h1>{{user.userName}}</h1>
      <h3>{{user.firstName}} {{user.lastName}}</h3>
    </section>
    <section class="game-stats">
        <h4>Games played: {{user.gamesPlayed}}</h4>
        <h4>Games won: {{user.gamesWon}}</h4>
        <h4>Games lost: {{user.gamesLost}}</h4>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserProfile',
	props: {
		user: Object
	}
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