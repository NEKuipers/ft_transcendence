<template>
	<div v-if="profiles">
		<ul v-for="profile, ranking in profiles" :key="profile.user_id">
			<section class="leaderboardList">
				<ListedUser class="leaderboardUser" :profile="profile" :ranking="ranking+1"></ListedUser>
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
import { User } from '../types/UserType'
import { Profile } from '../types/ProfileType'


export default defineComponent({
	name: 'ProfileView',
	props: {
	},
	data () {
		return {
			selectedFile: null,
			users: Object as () => User,
			profiles: Object as () => Profile
		}
	},
	mounted() {
		fetch(`api/profile/`)
		.then(res => res.json())
		.then(data => this.profiles = data.sort((a:Profile ,b:Profile) => b.games_won - a.games_won))
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