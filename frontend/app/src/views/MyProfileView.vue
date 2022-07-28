<template>
  <div>
    <div class="row">
      <div class="top-column" v-if="user">
        <UserProfile :user="user"></UserProfile>
      </div>
      <div class="top-column" v-else>
        <h2>User not found</h2>
      </div> <!-- TODO add loading for user -->
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
			selectedFile: null,
			user: null,
		}
	},
	async mounted() {
		let login = loginStatusStore();
		if (login.loggedInStatus) {
			await this.loadUserData(login.loggedInStatus?.userID);
		} else {
			console.error("Loading MyProfileView while not logged in!")
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

.row:after {
  content:"";
  display: table;
  clear:both;
}
</style>