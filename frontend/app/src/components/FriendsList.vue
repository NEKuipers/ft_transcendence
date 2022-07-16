<template>
	<div class ="friendlist">
	<h3>Friends</h3>
		<div v-if="!friends">
			<h3>Friend list failed to load</h3>
		</div>
		<div v-else-if="friends.length">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="friend in friends" :key="friend?.id">
				<section class="listed-friend">

					<img class="profilePictureThumbnail" width="50" height="50" src="../assets/Profile-picture-default.png"/>
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + friend.to_user_id">{{friend.to_username}}</a>
					<SmallButton class="unfriend-btn" @click="unfriend(friend.to_user_id)" text="Remove"/> 
					<h4 v-if="user?.isLoggedIn === true" id="online-status">Online</h4>
					<h5 v-else id="online-status">Offline</h5>
					<!-- TODO change statuses to logged in/out/ingame -->
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No friends yet</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';


export default defineComponent({
	name: 'FriendsList',
	props: {
		user: {
			type: Number
		},
	},
	data () {
		return {
			friends: null,
			loginStatusStore: loginStatusStore()
		}
	},
	watch: {
		user: {
			handler(newValue) {
				if (!newValue) { return; }
				fetch('/api/friends/' + this.user)
					.then(res => res.json())
					.then(data => this.friends = data)
					.catch(err => {this.friends = null; console.log(err);
					});
			},
			immediate: true
		}
	},
	components: {
		SmallButton,
	},
	methods: {
		async unfriend(to_user_id: number) { 
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({from_user_id: this.user, //TODO get correct id after login
				to_user_id: to_user_id}) 
			};
			fetch('/api/friends', requestOptions)
				.then(response => console.log(response.status))
				.catch(err => console.log(err));
		},

	}
})

</script>

<style scoped>
.friend {
	font-size: 26pt;
	font-weight: bold;
	text-decoration: none;
	padding-left: 30px;
}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}
.unfriend-btn {
	margin-top: 25px;
	margin-left: 20px;
	float:right;
}

#online-status {
	float: right;
	margin: 10px;
	padding-top: 25px;
}
.listed-friend {
	display: inline-block;
}

.profilePictureThumbnail {
	margin-left: 20px;
	padding-top: 0px;
}


</style>