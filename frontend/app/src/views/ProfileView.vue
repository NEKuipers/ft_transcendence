<template>
  <div>
    <div v-if="!user">
      <h2>User profile failed to load</h2>
    </div>
    <div v-else>
      <UserProfile :user="user?.id"></UserProfile>
    </div>
    <br>
    <br>
    <div class="row">
        <FriendsList class="column" :own="false" :user="user?.id"/>
        <AchievementsList class="column" :user="user?.id"/>
    </div>
      <MatchHistory class="matchHistory" :user="user?.id"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  UserProfile from '../components/UserProfile.vue';
import AchievementsList from '../components/AchievementsList.vue'
import FriendsList from '../components/FriendsList.vue';
import MatchHistory from '../components/MatchHistory.vue';

export default defineComponent({
	name: 'ProfileView',
	props: {},
	methods: {
		async loadUserData(id: string) {
			fetch('/api/users/' + id)
				.then(res => res.json())
				.then(data => this.user = data)
				.catch(err => console.log('What is: ' + err));
		}
	},
	data () {
		return {
			user: null as any,
			login: {}
		}
	},
	async mounted() {
		await this.loadUserData(this.$route.params.id[0]);
		console.log(this.login)
	},
	components: {
		UserProfile,
		AchievementsList,
		FriendsList,
		MatchHistory
	},
});
</script>

<style scoped>
.column {
	float: right;
	width: 50%;
	box-sizing: border-box;
}

.row:after {
	content:"";
	display: table;
	clear:both;
}
.row {
	
	border:1px solid #ccc;
}
</style>
