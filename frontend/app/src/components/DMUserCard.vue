<template>
	<div>
	User overview
	<div v-if="profile" class="userprofile">
		<img class="profilePicture" v-bind:src="'/api/avatars/' + profile.avatar_id">
		<br>
		<section class="names">
			<h1 class="username"><a v-bind:href="'/profile/' + profile.user_id">{{profile.username}}</a></h1>
			<div v-if="profile.is_logged_in == true">
				<h5 class="online">Online</h5>
			</div>
			<h5 v-else>Offline</h5>
		</section>
		<section v-if="profile" class="game-stats">
			<h4>Games played: {{profile.games_won + profile.games_lost}}</h4>
			<h4>Games won: {{profile.games_won}}</h4>
			<h4>Games lost: {{profile.games_lost}}</h4>
			<h4>Overall ranking:  #{{profile.ranking}}</h4>
		</section>
		<br>
		<SmallButton class="invite-btn" text="Invite to game" @click="gameInvite"/>
		<DialogueBox id="selectGameModeDialogueBox" :type="boxType" :show="showSelectGameModeDialogue" @game-mode-selected="gameModeSelected"/>
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
		user: Number,
	},
	data () {
		return {
			loginStatusStore: loginStatusStore(),
			showSelectGameModeDialogue: false,
			boxType: "selectGameMode",
			isFriend: -1,
			profile: null as null | any,
		}
	},
	components: {
		SmallButton,
		DialogueBox,
	},
	watch: {
        user: {	// Once the user propery has changed
            handler(id) {	// Call this function, argument is the new value user got set to
                if (!id) { return; }	// If we don't have a id we don't want to update
				this.updateProfileData(id);
				this.updateIsFriend(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number);
			},
			immediate: true	// But also call the function once on mount
		},
	},
	methods: {
		goToMyProfile() {
			this.$router.push('/myprofile');
		},

		async updateIsFriend(your_id: number, other_id: number) {
			await fetch(`/api/friends/is_friend/${your_id}&${other_id}`)
				.then(res => res.json())
				.then(data => this.isFriend = data)
				.catch(err => console.log('Error in updateIsFriend: ' + err));
		},

		async updateProfileData(user_id: number) {
			fetch(`/api/profile/` + user_id)
				.then(res => res.json())
				.then(data => this.profile = data[0]) 
				.catch(err => console.log('Error in updateProfileData: ' + err));
		},
		gameInvite() {
			this.showSelectGameModeDialogue = true;
		},
		gameModeSelected(game_mode: string) {
			this.$emit('inviteToGame', this.profile.username, game_mode);
			this.showSelectGameModeDialogue = false;
		},
	},
	emits: ['inviteToGame']
});
</script>

<style scoped>

.userprofile {
	margin-top: 100px;
	height: 500px;
	max-height: 500px;
	display: inline-block	;
}

#friendstatus {
	margin-top: 14px;
	margin-bottom:0px;
	color: #42b983;
	text-decoration: bold;
}

.names {
  margin-top: 0px;
}

a:link{
	text-decoration: none;
}

#blocked-you {
	font-size: 20px;
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

#request-sent {
	background: #42b983;
	color:#fff;
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

.invite-btn {
	font-size: 20px;
}

.game-stats {
	font-size: 18px;
}
</style>