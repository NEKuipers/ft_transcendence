<template>
  <div class="userprofile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
      <h1 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user?.id">{{user?.userName}}</a></h1>
      <div v-if="user?.isLoggedIn === true">
        <h4 id="online-status">Online</h4>
      </div>
      <h5 v-else>Offline</h5>
    </section>
    <section class="game-stats">
      <h4>Games played: {{user?.gamesPlayed}}</h4>
        <h4>Games won: {{user?.gamesWon}}</h4>
        <h4>Games lost: {{user?.gamesLost}}</h4>
        <h4>Overall ranking:  #{{user?.leaderboardPosition}}</h4>
    </section>
    <div v-if="user?.id == loginStatusStore.loggedInStatus?.userID">
      <SmallButton class="user-btn" text="Change avatar"></SmallButton>
      <SmallButton class="user-btn" text="Change username"></SmallButton>
    </div>
	<div v-if="user?.id != loginStatusStore.loggedInStatus?.userID">
		<SmallButton class="user-btn" text="Message"></SmallButton>
		<SmallButton class="user-btn" text="Invite to game"></SmallButton>
    <br>
    <br>
		<SmallButton class="user-btn" text="Add Friend"></SmallButton>
		<SmallButton class="user-btn" text="Block User"></SmallButton>
	</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
	name: 'UserProfile',
	props: {
		user: Object,
	},
	data () {
		return {
			loginStatusStore: loginStatusStore()
		}
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

#online-status {
  color: #42b983;

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