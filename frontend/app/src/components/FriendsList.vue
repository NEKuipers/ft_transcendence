<template>
	<div class ="friendlist">
	<h3>Friends</h3>
		<div v-if="!friends">
			<h3>Friend list failed to load</h3>
		</div>
		<div v-else-if="friends.length">
			<div v-for="friend in friends" :key="friend?.id">
				<section class="listed-friend">
					<div v-if="own === true">
						<SmallButton class="unfriend-btn" @click="unfriend(friend.to_user_id)" text="Remove"/>
					</div>
					<img class="profilePictureThumbnail" width="50" height="50" v-bind:src="'http://localhost:3030/avatars/' + friend.friend_avatar_id"/> 
					<!-- src="findFriendAvatar(friend.to_user_id)" -->
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + friend.to_user_id">{{friend.to_username}}</a>
					<h4 class="online-status" v-if="friend?.friend_status == 'online'" id="online">Online</h4>
					<h4 class="online-status"  v-else-if="friend?.friend_status == 'ingame'" id="ingame">In game</h4>
					<h4 class="online-status" v-else>Offline</h4>
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


export default defineComponent({
	name: 'FriendsList',
	props: {
		user: {
			type: Number
		},
		own: {
			type: Boolean
		},
	},
	data () {
		return {
			friends: null as null | Array<any>,
		}
	},
	watch: {
		user: {
			handler(newValue) {				
				if (!newValue) { return; }
				this.updateFriendList(newValue)
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
				body: JSON.stringify({from_user_id: this.user,
				to_user_id: to_user_id}) 
			};
			fetch('/api/friends', requestOptions)
				.then(response => console.log(response.status))
				.catch(err => console.log(err));
			this.updateFriendList(this.user as number);
			this.updateFriendList(this.user as number);
		},
		async updateFriendList(user_id: number) {
			fetch('/api/friends/' + user_id)
				.then(res => res.json())
				.then(data => this.friends = data)
				.catch(err => console.log(err));
		}
	}
})

</script>

<style scoped>
.friend {
	margin-top: 5px;
	font-size: 26pt;
	font-weight: bold;
	text-decoration: none;
	padding-left: 30px;
	float: left;

}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}

#online-status {
	float: left;
	/* padding-top: 25px; */
}

.unfriend-btn {
	margin-top: 20px;
	margin-left: 20px;
	float:left;
}

.listed-friend {
	display: inline-block;
	/* overflow: auto; */
	width: 500px;
}

#online {

  color: #42b983;

}

#ingame {
  color: #42b983;

}

.profilePictureThumbnail {
	margin-left: 20px;
	padding-top: 0px;
	float: left;

}


</style>