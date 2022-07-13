<template>
	<div class ="friendlist">
		<div v-if="friends">
		<!-- Need to figure out how to filter only friends of logged in user! -->
			<div v-for="friend in friends" :key="friend.id">
				<section class="listed-friend">
					<a class="friend" v-bind:href="'http://localhost:8080/profile/' + friend.to_user_id">{{friend.to_username}}</a>
					<SmallButton text="Remove"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No match history found</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'

export default defineComponent({
	name: 'FriendsList',
	props: {},
	data () {
		return {
			friends: null,
		}
	},
	async mounted() {
	fetch('api/friends/')
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
}
</style>