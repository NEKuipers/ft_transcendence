<template>
  <div class="userprofile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
      <h1 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user.id">{{user.userName}}</a></h1>
    </section>
    <section class="game-stats">
        <h4>Games played: {{user.gamesPlayed}}</h4>
        <h4>Games won: {{user.gamesWon}}</h4>
        <h4>Games lost: {{user.gamesLost}}</h4>
    </section>
	<div v-if="user.id != '3'"> <!-- TODO change to login-id -->
		<SmallButton class="user-btn" text="Message"></SmallButton>
		<SmallButton class="user-btn" text="Invite to game"></SmallButton>
	</div>
  <div v-else>
    <router-link to="myprofile-edit">
		<SmallButton class="user-btn" text="Edit profile"></SmallButton>
    </router-link>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'

export default defineComponent({
	name: 'UserProfile',
	props: {
		user: Object
	},
	components: {
		SmallButton,
	}
});
</script>

<style scoped>

.names {
  margin-top: 0px;
}

a:link{
	text-decoration: none;
}

.username {
	margin-top: 3px;
	font-size: 28px;
	text-decoration: none;
}

.username:hover {
	text-decoration: underline;
}

a:visited {
  color: #2c3e50;
}

.game-stats {
  padding: 0px;
  margin: 0px;
}

.game-stats h4 {
  padding: 0px;
  margin: 5px;
}

.user-btn {
  margin-left: 5px;
  margin-right: 5px;
}


</style>