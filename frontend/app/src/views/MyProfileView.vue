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
        <BlockedUsers />
      </div>
    </div>
    <div class="matchHistory">
      <MatchHistory :user="user?.id"/>	<!-- Show the match history of the user with the id "user.id"-->
    </div>
  </div>
</template>

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

<script lang="ts">
  /*
  list of data requirements (fetch() calls) for this view:
  GET:
    - Users
      * id
      * username
      * status?
      * games played, wins, losses
      * leaderboard position based on match history
      * achievements won by this user
    - Avatars
      * id
      * user_id
      * img
    - Friends
      * list of friends, match friend with username
    - Achievements
      * list of achievements and if this user has them

  POST:
    - Blocked users (if you block someone on their profile)
    - Friends (if you send a friend request)

  PATCH:
    - Friends (if you accept a friend request? figure this out soon)
  
  DELETE: 
    - Friends (if you unfriend someone?)
    - Blocked_users (if you unblock someone)
    
  */
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

	// watch: {
	// 	user: {
	// 		handler(newValue) {
	// 			if (!newValue) { return; }	// It can be undefined at the start
	// 			fetch('/api/users/' + this.user.id)
	// 				.then(res => res.json())
	// 				.then(data => this.user = data)
	// 				.catch(err => {this.user = null; console.log(err);
	// 				});
	// 		},	
	// 		immediate: true
	// 	}
	// },
	data () {
	return {
			selectedFile: null,
			user: null as null | any,
		}
	},
	async mounted() {
		let login = loginStatusStore();
		if (login.loggedInStatus) {
			await this.loadUserData(login.loggedInStatus.userID); //TODO this still works kind of weird, make sure page reloads
		} else {
			// We are not logged in, The router SHOULD prevent us from going here, yet we still got here
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
