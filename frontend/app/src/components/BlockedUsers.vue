<template>
	<div class ="blocked-users">
      <h3>Blocked Users</h3>
		<div v-if="!blockedUsers">
			<h3>Blocked users failed to load</h3>
		</div>
		<div v-else-if="blockedUsers">
			<div v-for="block in blockedUsers" :key="block?.id">
				<section class="listed-blocked">
					<SmallButton class="unblockbutton" @click="unblockUser(block.blocked_user_id)" text="Unblock"/>
					<a class="blocked-user" v-bind:href="'/profile/' + block.blocked_user_id">{{block.blocked_user_name}}</a>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>None</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
	name: 'BlockedUsers',
	props: {
		user: {
			type: Number
		},
	},
	data () {
		return {
			blockedUsers: null as null | any,
			loginStatusStore: loginStatusStore(),
		}
	},
	watch: {
		user: {
			handler(newValue) {				
				if (!newValue) { return; }
				this.updateBlockedUsers(newValue);
			},
			immediate: true
		}
	},
	methods: {
		async unblockUser(bid: number) {
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({other_id: bid}) 
			};
			fetch('/api/blocked_users', requestOptions)
				.then(response => this.updateBlockedUsers(this.user as number))
				.catch(err => console.log(err));
		},
		async updateBlockedUsers(user_id: number) {
			fetch('/api/blocked_users/' + user_id)
				.then(res => res.json())
				.then(data => this.blockedUsers = data)
				.catch(err => console.log(err));
		},
	},
	components: {
		SmallButton,
	}
})
</script>

<style scoped>
.blocked-user {
	font-size: 22pt;
	font-weight: bold;
	text-decoration: none;
	padding-left: 30px;
	margin-right: 200px;
}

.unblockbutton {
	margin: 10px;
}

a:visited {
  color: #2c3e50;
}

a:hover {
	text-decoration: underline;
}
</style>