<template>
	<div class ="friendlist">
	<h3>Friends</h3>
		<div v-if="!friends">
			<h3>Friend list failed to load</h3>
		</div>
		<div v-else-if="friends">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="friend in friends" :key="friend?.id">
				<section class="listed-friend">
					<!-- <SmallButton v-if="user?.id != loginStatusStore.loggedInStatus?.userID" @click="unfriend" text="Remove"/> This gives an error until we get OAuth working-->
					<SmallButton @click="unfriend(friend['to_user_id'])" text="Remove"/> 
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + friend.to_user_id">{{friend.to_username}}</a>
					<!-- TODO add online status and possible avatar here -->
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
		user_id: Number,
	},
	data () {
		return {
			friends: null,
			loginStatusStore: loginStatusStore()
		}
	},
	async mounted() {
		fetch('/api/friends/')
			.then(res => res.json())
			.then(data => this.friends = data)
			.catch(err => console.log(err));
	},
	components: {
		SmallButton,
	},
	methods: {
		async unfriend(to_user_id: number) { 
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({from_user_id: this.user_id, //TODO get correct id after login
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

</style>