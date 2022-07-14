<template>
	<div class ="blocked-users">
      <h3>Blocked Users</h3>
		<div v-if="blockedUsers">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="block in blockedUsers" :key="block?.id">
				<section class="listed-friend">
					<SmallButton class="requestbutton" text="Unfriend"/>
					<a class="blocked-user" v-bind:href="'http://localhost:8080/profile/' + block.blocked_user_id">{{block.blocked_user_name}}</a>
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
	methods: {
		async loadUserData(id: number) {
			fetch('/api/blocked-users/' + id)
			.then(res => res.json())
			.then(data => this.blockedUsers = data)
			.catch(err => console.log(err));
			console.log(this.blockedUsers);
		},
	},
	data () {
		return {
			blockedUsers: null,
			loginStatusStore: loginStatusStore(),

		}
	},
  async mounted() {
	let login = loginStatusStore();
    if (login.loggedInStatus) {
      await this.loadUserData(login.loggedInStatus.userID); //TODO this still works kind of weird, make sure page reloads
    } else {
      // We are not logged in, The router SHOULD prevent us from going here, yet we still got here
      console.error("Loading MyProfileView while not logged in!")
    }
  },
	components: {
		SmallButton,
	}
})

</script>

<style scoped>
.blocked-user {
	font-size: 26pt;
	font-weight: bold;
	text-decoration: none;
	padding-left: 30px;
}

.unfriendbutton {
	margin: 10px;
}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}

</style>