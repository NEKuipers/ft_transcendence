<template>
	<div class ="friend-requests">
      <h3>Friend Requests</h3>
		<div v-if="!friendRequests">
			<h3>Friend requests failed to load</h3>			
		</div>
		<div v-else-if="friendRequests.length">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="request in friendRequests" :key="request?.id">
				<section  v-if="request.status='send'" class="listed-friend">
					<SmallButton class="requestbutton" text="Accept" @click="acceptRequest(request.from_user_id)"/>
					<SmallButton class="requestbutton" text="Decline" @click="declineRequest(request.from_user_id)"/>
					<!-- TODO THIS BUTTON STORE THING DOESNT WORK -->
					<a class="friend" v-bind:href="'/profile/' + request.from_user_id">{{request.from_username}}</a>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No new friend requests</h3>
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
			type: Number,
		},
	},
	data () {
		return {
			friendRequests: null as null | Array<any>,
			interval: 0,
		}
	},
	mounted () {
		this.interval = setInterval(() => {
			this.updateFriendRequests(this.user as number);
		}, 2000);
	},
	unmounted() {
		clearInterval(this.interval);
	},
	watch: {
		user: {
			handler(newValue) {
				if (!newValue) { return; }
				this.updateFriendRequests(newValue);
			},
			immediate: true,
		}
	},
	components: {
		SmallButton,
	},
	methods: {
		async acceptRequest(from_user_id: number) {
			const requestOptions = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({id:from_user_id}) 
			};
			fetch('/api/friends/accept', requestOptions)
				.then(response => {
					this.updateFriendRequests(this.user as number); 
					this.$emit('acceptRequest')
				})
				.catch(err => console.log(err));
		},
		async declineRequest(from_user_id: number) {
			const requestOptions = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({id:from_user_id}) 
			};
			fetch('/api/friends/decline', requestOptions)
				.then(response => this.updateFriendRequests(this.user as number))
				.catch(err => console.log(err));
		},
		async updateFriendRequests(user_id: number) {
			fetch('/api/friends/requests/' + user_id)
				.then(res => res.json())
				.then(data => this.friendRequests = data)
				.catch(err =>  console.log(err));
		}
	},
	emits: ['acceptRequest']
})
</script>

<style scoped>
.friend {
	font-size: 22pt;
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