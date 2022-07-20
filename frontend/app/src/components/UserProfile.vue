<template>
	<div class="userprofile">
	<img class="profilePicture" src="../assets/Profile-picture-default.png">
	<br>
	<section class="names">
		<div v-if="user?.id == loginStatusStore.loggedInStatus?.userID">
			<h1 class="username">{{user?.username}}</h1>
		</div>
		<div v-else>
			<h1 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user?.id">{{user?.username}}</a></h1>
		</div>
		<div v-if="user?.is_logged_in === true">
			<h5 class="online">Online</h5>
		</div>
		<h5 v-else>Offline</h5>
	</section>
	<section class="game-stats">
		<h4>Games played: {{user?.gamesPlayed}}</h4>
		<h4>Games won: {{user?.gamesWon}}</h4>
		<h4>Games lost: {{user?.gamesLost}}</h4>
		<h4>Overall ranking:  #{{user?.ladder_position}}</h4>
	</section>
	<div v-if="user?.id == loginStatusStore.loggedInStatus?.userID">
		<SmallButton class="user-btn" text="Change avatar" @click="changeAvatar"/>
		<SmallButton class="user-btn" text="Change username" @click="changeUsername"/>
    <DialogueBox :show="showDialogue" @close-dialogue="hideDialogue" @new-name="saveUsername"/>
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
import DialogueBox from './DialogueBox.vue'

export default defineComponent({
	name: 'UserProfile',
	props: {
		user: Object,
	},
	data () {
		return {
			loginStatusStore: loginStatusStore(),
			showDialogue: false
		}
	},
	components: {
		SmallButton,
		DialogueBox
	},
	// setup () {},
	methods: {
		changeAvatar() {
			console.log('change avatar');
		},
		async changeUsername() {
			this.showDialogue = true;
		},
		directMessage() {
			console.log('direct message');
		},
		inviteToGame() {
			console.log('invite to game');
		},
		hideDialogue() {
			// console.log('Should be triggered by x button')
			this.showDialogue = false;
		},
		saveUsername(newname: string) {
			console.log('New name is:', newname)
			// Here should make a patch request to change the name (Make sure that it is unique) TODO
			// And then give user a confirmation of sorts.
			const id = this.loginStatusStore.loggedInStatus?.userID
			// console.log('Logged user', username)
			if (id != undefined) {
				fetch('/api/users/' + id, {
					method: "PATCH",
					body: JSON.stringify({
						"username": newname,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
				.then(response => console.log(response))
				.catch(err => console.log(err))
			}

			// If successful close window
			this.hideDialogue();
			// Else
			// alert('That name is not unique/is taken')
		},
		async addFriend() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	from_user_id: 1,  //TODO get correct id after login
										to_user_id: this.user?.id})};
			fetch('/api/friends', requestOptions)
				.then(res => console.log(res.status))
				.catch(err => console.log(err));			
		},
		async blockUser() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	blocked_by_id: 1,//TODO get correct id after login
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

.online {
	color: #42b983;
}

.user-btn {
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
}


</style>