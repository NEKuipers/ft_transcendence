<template>
	<div v-if="users">
		<ul v-for="user, ranking in users" :key="user.id">
			<section class="leaderboardList">
				<ListedUser class="leaderboardUser" :user="user" :ranking="ranking"></ListedUser>
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
	.then(data => this.users = data.sort((a:any ,b:any) => b.gamesWon - a.gamesWon))
	.catch(err => console.log(err));    
	},
	components: {
		ListedUser,
	},
	methods: {
	},
});

</script>

<style scoped>

.leaderboardUser {
	border-style:solid;
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	width:80%;
	background-color: #f3f3f3;
}

.leaderboardList {
	border-bottom-width:1px;
	width:80%;
}

</style>