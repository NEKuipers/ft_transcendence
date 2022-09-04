<template>
	<div v-if="profile" class="userprofile">
		<img class="profilePicture" v-bind:src="'/api/avatars/' + profile.avatar_id">
		<br>
		<section class="names">
			<div v-if="profile.user_id == loginStatusStore.loggedInStatus?.userID">
				<h1 class="username">{{profile.username}}</h1>
			</div>
			<div v-else>
				<h1 class="username"><a v-bind:href="'/profile/' + profile.user_id">{{profile.username}}</a></h1>
			</div>
			<div v-if="hasBlockedYou==false">
				<div v-if="profile.is_logged_in == true">
					<h5 class="online">Online</h5>
				</div>
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
			<h5 id="blocked-you">User has blocked you</h5>
		</section>
		<div v-if="profile.user_id == loginStatusStore.loggedInStatus?.userID">
			<SmallButton class="user-btn" text="Change avatar" @click="changeAvatar"/>
			<SmallButton class="user-btn" text="Change username" @click="changeUsername"/>
			<DialogueBox :type="boxType" :show="showDialogue" 
				@close-dialogue="hideDialogue" 
				@new-name="saveUsername"
				@new-avatar="saveAvatar"/>
			<br>
			<div v-if="loginStatusStore.loggedInStatus && !loginStatusStore.loggedInStatus.TFAEnabled && inMyProfile == true">
				<router-link to="/tfa">
					<SmallButton class="user-btn" text="Setup two-factor authentication"/>
				</router-link>
			</div>
		</div>
		<div v-if="profile.user_id != loginStatusStore.loggedInStatus?.userID && hasBlockedYou==false">
			<div v-if="youHaveBlocked==true">
				<SmallButton class="user-btn" text="Unblock User" @click="unblockUser"></SmallButton>
			</div>
			<div v-else>
				<SmallButton class="user-btn" text="Add Friend" @click="addFriend"></SmallButton>
				<SmallButton class="user-btn" text="Block User" @click="blockUser"></SmallButton>
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
	},
	data () {
		return {
			loginStatusStore: loginStatusStore(),
			showDialogue: false,
			boxType: "",
			hasBlockedYou: false,
			youHaveBlocked: false,
			profile: null as null | any,
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
				this.updateHasBlockedYou(id);
				this.updateBlockedByYou(id);
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
		async saveUsername(newname: string) {
			if (newname.length > 14) {
				return alert ('Username too long.');
			}
			const id = this.loginStatusStore.loggedInStatus?.userID
			if (id != undefined) {
				await fetch('/api/users/' + id, {
					method: "PATCH",
					body: JSON.stringify({
						"username": newname,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
					.then(res => res.text())
					.then(data => {
						if (data === 'taken')
							alert('That username is already taken.')
						else
							this.hideDialogue();
					})
					.catch(err => console.log(err));
				this.updateProfileData(this.user as number);
			}
		},
		async saveAvatar(avatar_id: number) {
			// here use the avatar_id to do the patch request

			const id = this.loginStatusStore.loggedInStatus?.userID

			if (id) {
				await fetch('/api/users/avatar/' + id, {
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
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	from_user_id: this.loginStatusStore.loggedInStatus?.userID,
										to_user_id: this.user})};
			fetch('/api/friends', requestOptions)
				.then(res => console.log(res.status))
				.catch(err => console.log(err));			
		},
		async blockUser() {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	blocked_by_id: this.loginStatusStore.loggedInStatus?.userID,
										blocked_user_id: this.user}) 
			};
			fetch('/api/blocked_users', requestOptions)
				.then(response => console.log(response.status))
				.catch(err => console.log(err));
			this.updateBlockedByYou(this.loginStatusStore.loggedInStatus?.userID as number)
		},
		
		async unblockUser() {
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	blocked_by_id: this.loginStatusStore.loggedInStatus?.userID,
										blocked_user_id: this.user}) 
			};
			fetch('/api/blocked_users', requestOptions)
				.then(response => console.log(response.status))
				.catch(err => console.log(err));
			this.updateBlockedByYou(this.loginStatusStore.loggedInStatus?.userID as number)
		},

		async updateHasBlockedYou(user_id: number) {
			fetch(`/api/blocked_users/blocked_by_them/` + user_id)
				.then(res => res.json())
				.then(haveBlockedYou => {
					for (let i = 0; i < haveBlockedYou.length; i++) {
						if (haveBlockedYou[i].blocked_by_id == user_id)
							this.hasBlockedYou = true;
					}
				})
				.catch(err => console.log('Error in updateHasBlockedYou: ' + err));
		},

		async updateBlockedByYou(user_id: number) {
			fetch(`/api/blocked_users/blocked_by_you/` + user_id)
				.then(res => res.json())
				.then(usersBlockedByYou => {
					for (let i = 0; i < usersBlockedByYou.length; i++) {
						if (usersBlockedByYou[i].blocked_user_id == user_id)
							this.youHaveBlocked = true;
					}
				})
				.catch(err => console.log('Error in updateBlockedByYou: ' + err));
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
.names {
  margin-top: 0px;
}

a:link{
	text-decoration: none;
}

#blocked-you {
	font-size: 24px;
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