<template>
	<div v-if="profiles">
		<ul v-for="profile in profiles" :key="profile.user_id">
			<section class="leaderboardList">
				<ListedUser class="leaderboardUser" :profile="profile"></ListedUser>
			</section>
		</ul>
	</div>
	<div v-else>
		<h2>Loading profile</h2>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  ListedUser from '../components/LeaderboardListedUser.vue';
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
		.then(data => this.profiles = data)
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