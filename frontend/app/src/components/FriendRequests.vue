<template>
	<div class ="friend-requests">
      <h3>Friend Requests</h3>
		<div v-if="friendRequests">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="request in friendRequests" :key="request?.id">
				<section class="listed-friend">
					<SmallButton class="requestbutton" text="Accept"/>
					<SmallButton class="requestbutton" text="Decline"/>
					<!-- TODO THIS BUTTON STORE THING DOESNT WORK -->
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + request.from_user_id">{{request.from_username}}</a>
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
			friendRequests: null,
			loginStatusStore: loginStatusStore()
		}
	},
	async mounted() {
	fetch('/api/friends/requests')
		.then(res => res.json())
		.then(data => this.friendRequests = data)
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

.requestbutton {
	margin: 10px;
}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}

</style>