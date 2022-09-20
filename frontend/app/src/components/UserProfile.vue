<template>
	<div v-if="profile" class="userprofile">
		<img class="profilePicture" v-bind:src="'/api/avatars/' + profile.avatar_id">
		<br>
		<section class="names">
			<h1 class="username"><a v-bind:href="'/profile/' + profile.user_id">{{profile.username}}</a></h1>
			<div v-if="hasBlockedYou==false">
				<div v-if="profile.status == 'online'">
					<h5 class="online">Online</h5>
				</div>
				<h5 v-else-if="profile.status == 'ingame'">Ingame</h5>
				<h5 v-else>Offline</h5>
			</div>
		</section>
		<section v-if="hasBlockedYou==false && profile" class="game-stats">
			<h4>Games played: {{profile.games_won + profile.games_lost}}</h4>
			<h4>Games won: {{profile.games_won}}</h4>
			<h4>Games lost: {{profile.games_lost}}</h4>
			<h4>Overall ranking:  #{{profile.ranking}}</h4>
		</section>
		<section v-else>
			<h6 id="blocked-you">User has blocked you</h6>
		</section>
		<div v-if="profile.user_id == loginStatusStore.loggedInStatus?.userID">
			<div v-if="inMyProfile == true">
				<SmallButton class="user-btn" text="Change avatar" @click="changeAvatar"/>
				<SmallButton class="user-btn" text="Change username" @click="changeUsername"/>
				<DialogueBox :type="boxType" :show="showDialogue" 
					@close-dialogue="hideDialogue" 
					@new-name="saveUsername"
					@new-avatar="saveAvatar"/>
				<br>
				<div v-if="loginStatusStore.loggedInStatus && !loginStatusStore.loggedInStatus.TFAEnabled">
					<router-link to="/tfa">
						<SmallButton class="user-btn" text="Setup two-factor authentication"/>
					</router-link>
				</div>
			</div>
			<div v-else>
				<SmallButton class="user-btn" text="Go to my profile" @click="goToMyProfile"></SmallButton>
			</div>
		</div>
		<div v-if="profile.user_id != loginStatusStore.loggedInStatus?.userID && hasBlockedYou==false">
			<div v-if="youHaveBlocked==true">
				<SmallButton class="user-btn" text="Unblock User" @click="unblockUser"></SmallButton>
			</div>
			<div v-else>
				<div v-if="isFriend == 2"><h4 id="friendstatus">Friend</h4></div>
				<div v-else-if="isFriend == 0"><SmallButton class="user-btn" color="42b983" id="request-sent-btn" text="Request sent"></SmallButton></div>
				<div v-else-if="showButtons==true"><SmallButton class="user-btn" text="Add Friend" @click="addFriend"></SmallButton></div>
				<SmallButton v-if="showButtons==true" class="user-btn" text="Block User" @click="blockUser"></SmallButton>
			</div>
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
		inMyProfile: Boolean,
		inDM: Boolean,
	},
	data () {
		return {
			loginStatusStore: loginStatusStore(),
			showDialogue: false,
			boxType: "",
			hasBlockedYou: false,
			youHaveBlocked: false,
			isFriend: -1,
			profile: null as null | any,
			showButtons: true,
		}
	},
	components: {
		SmallButton,
		DialogueBox
	},
	watch: {
        user: {	// Once the user propery has changed
            handler(id) {	// Call this function, argument is the new value user got set to
                if (!id) { return; }	// If we don't have a id we don't want to update
				this.updateProfileData(id);
				this.updateHasBlockedYou(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number);
				this.updateBlockedByYou(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number);
				this.updateIsFriend(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number);
			},
			immediate: true	// But also call the function once on mount
		},
	},
	methods: {
		changeAvatar() {
			this.boxType = "avatar";
			this.showDialogue = true;
			// console.log('change avatar');
		},
		async changeUsername() {
			this.boxType = "namechange";
			this.showDialogue = true;
		},
		hideDialogue() {
			this.showDialogue = false;
		},
		goToMyProfile() {
			this.$router.push('/myprofile');
		},
		async saveUsername(newname: string) {
			const id = this.loginStatusStore.loggedInStatus?.userID
			if (id != undefined) {
				await fetch('/api/users/username', {
					method: "PATCH",
					body: JSON.stringify({"username": newname,}),
					headers: {'Content-type': 'application/json; charset=UTF-8'}})
					.then(res => res.text())
					.then(data => {
						if (data === 'taken'){
							alert('That username is already taken.')
						} else if (data === 'too-long') {
							alert('That username is too long.')
						} else {
							this.hideDialogue();
						}
					})
					.catch(err => console.log(err));
				this.updateProfileData(this.user as number);
			}
		},
		async saveAvatar(avatar_id: number) {
			// here use the avatar_id to do the patch request

			const id = this.loginStatusStore.loggedInStatus?.userID

			if (id) {
				await fetch('/api/users/avatar', {
					method: "PATCH",
					body: JSON.stringify({
						"avatar_id": avatar_id
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
					.catch(err => console.log(err))
				await this.updateProfileData(this.user as number)
			}

			this.hideDialogue()
		},
		async addFriend() {
			this.showButtons = false;
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({id: this.user})};
			await fetch('/api/friends', requestOptions)
				.then(res => this.updateIsFriend(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number))
				.catch(err => console.log(err));
			this.showButtons = true;

		},
		async blockUser() {
			this.showButtons = false;
			const your_id = this.loginStatusStore.loggedInStatus?.userID;
			const other_id = this.user;
			console.log(`blockcheck by_id ${your_id} other_id${other_id}`)
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({other_id: other_id}) 
			};
			await fetch('/api/blocked_users', requestOptions)
				.then(response => this.updateBlockedByYou(your_id as number, other_id as number))
				.catch(err => console.log(err));
			this.showButtons = true;

		},
		
		async unblockUser() {
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({other_id: this.user}) 
			};
			fetch('/api/blocked_users', requestOptions)
				.then(response => this.updateBlockedByYou(this.loginStatusStore.loggedInStatus?.userID as number, this.user as number))
				.catch(err => console.log(err));
		},

		async updateIsFriend(your_id: number, other_id: number) {
			await fetch(`/api/friends/is_friend/${your_id}&${other_id}`)
				.then(res => res.json())
				.then(data => this.isFriend = data)
				.catch(err => console.log('Error in updateIsFriend: ' + err));
		},

		async updateBlockedByYou(your_id: number, other_id: number) {
			await fetch(`/api/blocked_users/have_you_blocked_them/${your_id}&${other_id}`)
				.then(res => res.json())
				.then(data => this.youHaveBlocked = data)
				.catch(err => console.log('Error in updateBlockedByYou: ' + err));
		},

		async updateHasBlockedYou(your_id: number, other_id: number) {
			await fetch(`/api/blocked_users/have_they_blocked_you/` + your_id + '&' + other_id)
				.then(res => res.json())
				.then(data => this.hasBlockedYou = data)
				.catch(err => console.log('Error in updateHasBlockedYou: ' + err));
		},

		async updateProfileData(user_id: number) {
			fetch(`/api/profile/` + user_id)
				.then(res => res.json())
				.then(data => this.profile = data[0]) 
				.catch(err => console.log('Error in updateProfileData: ' + err));
		},
	}
});
</script>

<style scoped>

.userprofile {
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

.user-btn {
	margin-top: 10px;
	margin-left: 5px;
	margin-right: 5px;
}
</style>