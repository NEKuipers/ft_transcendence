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
  /*
  list of data requirements (fetch() calls) for this view:
  GET:
    - Users
		* id
		* username
		* status
		* match history created via a database view
	- Avatars
		* id
		* user_id
		* img
	
  */
import { defineComponent } from 'vue';
import  ListedUser from '../components/ListedUser.vue';

enum user_status {
	online,
	offline,
	ingame
}

type User = {
	readonly id: number;
	userName: string;
	status: user_status;
	oauth_refresh_token: string;
	oauth_token_expiration_timestamp: string;
	gamesPlayed: number; //TODO remove this later on
	gamesWon: number; //TODO remove this later on
	gamesLost: number; //TODO remove this later on
	isLoggedIn: boolean;
}

export default defineComponent({
	name: 'ProfileView',
	props: {
	},
	data () {
		return {
			selectedFile: null,
			users: Object as () => User,
		}
	},
	mounted() {
		fetch(`api/users/`)
		.then(res => res.json())
		.then(data => this.users = data.sort((a:User ,b:User) => b.gamesWon - a.gamesWon))
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
}

.leaderboardList {
	border-bottom-width:1px;
	margin: 0 auto 0 auto;
	width:80%;
}

</style>