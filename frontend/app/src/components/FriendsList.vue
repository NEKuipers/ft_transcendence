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
					<SmallButton v-if="user?.id != loginStatusStore.loggedInStatus?.userID" text="Remove"/>
					<!-- TODO THIS BUTTON STORE THING DOESNT WORK -->
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + friend.to_user_id">{{friend.to_username}}</a>
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
	props: {},
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