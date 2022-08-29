<template>
  <div>
    <div class="row">
      <UserProfile class="top-column" :user="user?.id"></UserProfile>
      <AchievementsList :user="user?.id" class="top-column"/>
    </div> 
    <br>
    <br>
    <div class="row">
      <FriendRequests  :user="user?.id" class="column"/>
      <FriendsList :own="true" :user="user?.id" class="column"/>
      <div class="column">
        <BlockedUsers :user="user?.id" />
      </div>
    </div>
    <div class="matchHistory">
      <MatchHistory :user="user?.id"/>	<!-- Show the match history of the user with the id "user.id"-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  UserProfile from '../components/UserProfile.vue';
import AchievementsList from '../components/AchievementsList.vue';
import { loginStatusStore } from '../stores/profileData';
import MatchHistory from '../components/MatchHistory.vue';
import FriendsList from '../components/FriendsList.vue';
import FriendRequests from '../components/FriendRequests.vue'
import BlockedUsers from '../components/BlockedUsers.vue';

export default defineComponent({
	name: 'MyProfileView',
	props: {},
	methods: {
		async loadUserData(id: number) {
			fetch('/api/users/' + id)
				.then(res => res.json())
				.then(data => this.user = data)
				.catch(err => console.log(err));
		}
	},
	data () {
		return {
			user: null as any,
		}
	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await this.loadUserData(loggedInStatus.userID);
		} else {
			console.error("Viewing MyProfileView while not logged in!")
		}
	},
	components: {
		UserProfile,
		AchievementsList,
		MatchHistory,
		FriendsList,
		FriendRequests,
		BlockedUsers,
	},
});
</script>

<style scoped>
.column {
	float:left;
	width:33.3%;
	padding:10px;
	box-sizing: border-box; /*this adds the border+padding into the width. can also look at flexbox*/	
}

.tfa-btn {
  margin-top: 10px;
}

.top-column {
  float: left;
  width: 50%;
  box-sizing: border-box;
}

.row {
  
	border:1px solid #ccc;
}

.user-profile{
	margin-top: 40px;
}
.row:after {
  content:"";
  display: table;
  clear:both;
}
</style>