<template>
	<div v-if="users">
		<ul v-for="user in users" :key="user.id">
			<section class="leaderboardList">
				<ListedUser :user="user"></ListedUser>
			</section>
		</ul>
	</div>
	<div v-else>
		<h2>Loading profile</h2>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  ListedUser from '../components/ListedUser.vue';

export default defineComponent({
	name: 'ProfileView',
	props: {
	},
	data () {
	return {
		selectedFile: null,
		users: null,
	}
	},
	mounted() {
	fetch('http://localhost:3000/users/')
	.then(res => res.json())
	.then(data => this.users = data.sort((a,b) => b.gamesWon - a.gamesWon))
	.catch(err => console.log(err));    
	},
	components: {
		ListedUser,
	},
	methods: {
		
		},
});

</script>
