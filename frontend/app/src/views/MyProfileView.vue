<template>
  <div>
    <div v-if="user">
      <UserProfile :user="user"></UserProfile>
    </div>
    <div v-else>
      <h2>User not found</h2>
    </div> <!-- TODO add loading for user -->
    <br>
    <br>
    <div class="row">
      <AchievementsList class="column"/>
      <FriendsList class="column"/>
      <div class="column">
        <h3>Blocked Users</h3>
      </div>
    </div>
    <div class="matchHistory">
      <MatchHistory :user="user.id"/>	<!-- Show the match history of the user with the id "user.id"-->
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
      user: {},
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
  },
});


</script>
