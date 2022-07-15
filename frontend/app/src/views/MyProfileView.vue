<template>
	<div>
	<div class="row">
		<div class="top-column" v-if="!user">
			<h2>User profile failed to load</h2>
		</div>
		<div class="top-column" v-else-if="user">
			<UserProfile :user="user"></UserProfile>
			<router-link to="/two-factor-authentication">
				<SmallButton class="tfa-btn" text="Set two factor authentication"/>
			</router-link>
		</div>
		<div class="top-column" v-else>
			<h2>User not found</h2>
		</div> <!-- TODO add loading for user -->
		<AchievementsList class="top-column"/>
	</div> 
	<br>
	<br>
	<div class="row">
		<FriendRequests class="column"/>
		<FriendsList class="column"/>
		<BlockedUsers class="column" />
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
<<<<<<< HEAD
import { useLoginStatusStore } from '../stores/profileData';
=======
import { loginStatusStore } from '../stores/profileData';
import MatchHistory from '../components/MatchHistory.vue';
import FriendsList from '../components/FriendsList.vue';
import FriendRequests from '../components/FriendRequests.vue'
import BlockedUsers from '../components/BlockedUsers.vue';
import SmallButton from '../components/SmallButton.vue';
>>>>>>> ec1c7e910452b878e9e37bff058201b801891b29

export default defineComponent({
  name: 'MyProfileView',
  props: {
    },
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
<<<<<<< HEAD
    let g_login_id = '3'; //TODO This variable directs you to various profiles, need to fix
    await this.loadUserData(g_login_id); //TODO this still works kind of weird, make sure page reloads
    this.login = useLoginStatusStore()

=======
	let login = loginStatusStore();
    if (login.loggedInStatus) {
      await this.loadUserData(login.loggedInStatus.userID); //TODO this still works kind of weird, make sure page reloads
    } else {
      // We are not logged in, The router SHOULD prevent us from going here, yet we still got here
      console.error("Loading MyProfileView while not logged in!")
    }
>>>>>>> ec1c7e910452b878e9e37bff058201b801891b29
  },
  components: {
    UserProfile,
    AchievementsList,
    MatchHistory,
    FriendsList,
    FriendRequests,
    BlockedUsers,
    SmallButton
},
});


</script>
