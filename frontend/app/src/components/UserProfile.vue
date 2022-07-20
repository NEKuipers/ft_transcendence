<template>
	<div class="userprofile">
	<img class="profilePicture" src="../assets/Profile-picture-default.png">
	<br>
	<section class="names">
		<h1 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user?.id">{{user?.username}}</a></h1>
		<h5 v-if="user?.is_logged_in === true">Online</h5>
		<h5 v-else>Offline</h5>
	</section>
	<section class="game-stats">
		<h4>Games played: {{user?.gamesPlayed}}</h4>
		<h4>Games won: {{user?.gamesWon}}</h4>
		<h4>Games lost: {{user?.gamesLost}}</h4>
		<h4>Overall ranking:  #{{user?.leaderboardPosition}}</h4>
	</section>
	<div v-if="user?.id == loginStatusStore.loggedInStatus?.userID">
		<SmallButton class="user-btn" text="Change avatar" @click="changeAvatar"/>
		<SmallButton class="user-btn" text="Change username" @click="changeUsername"/>
		<br>
		<div v-if="!user.TFAEnabled">
			<router-link to="/tfa">
				<SmallButton class="user-btn" text="Setup two-factor authentication"/>
			</router-link>
		</div>
	</div>
	<div v-if="user?.id != loginStatusStore.loggedInStatus?.userID">
		<SmallButton class="user-btn" text="Message" @click="directMessage"></SmallButton>
		<SmallButton class="user-btn" text="Invite to game" @click="inviteToGame"></SmallButton>
	<br>
	<br>
		<SmallButton class="user-btn" text="Add Friend" @click="addFriend"></SmallButton>
		<SmallButton class="user-btn" text="Block User" @click="blockUser"></SmallButton>
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
	},
	methods: {
		changeAvatar() {
			console.log('change avatar');
		},
		changeUsername() {
			console.log('change username');
		},
		directMessage() {
			console.log('direct message');
		},
		inviteToGame() {
			console.log('invite to game');
		},
		async addFriend() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	from_user_id: 3,  //TODO get correct id after login
										to_user_id: this.user?.id})};
			fetch('/api/friends', requestOptions)
				.then(res => console.log(res.status))
				.catch(err => console.log(err));			
		},
		async blockUser() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	blocked_by_id: 3,//TODO get correct id after login
										blocked_user_id: this.user?.id}) 
			};
			fetch('/api/blocked_users', requestOptions)
				.then(response => console.log(response.status))
				.catch(err => console.log(err));
		},
	},
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
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
}


</style>