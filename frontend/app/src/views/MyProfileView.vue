<template>
  <div>
    <div class="row"> 
      <UserProfile class="top-column" :inMyProfile="true" :user="user?.id"></UserProfile>
      <AchievementsList :user="user?.id" class="top-column"/>
    </div> 
    <br>
    <br>
    <div class="row">
      <FriendRequests  class="column" :user="user?.id" @acceptRequest="friendsUpdater"/>
      <FriendsList class="column" :own="true" :user="user?.id" :key="newFriendKey"/>
      <div class="column">
        <BlockedUsers :user="user?.id" />
      </div>
    </div>
    <div class="matchHistory">
      <MatchHistory :user="user?.id"/>
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
		},
		friendsUpdater() {
			this.newFriendKey += 1;
		}
	},
	data () {
		return {
			user: null as any,
			newFriendKey: 0,
		}
	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await this.loadUserData(loggedInStatus.userID);
		} else {
			console.log("Viewing MyProfileView while not logged in!")
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
	min-width: 1100px;
	border:1px solid #ccc;
}


.row:after {
  content:"";
  display: table;
  clear:both;
}
</style>