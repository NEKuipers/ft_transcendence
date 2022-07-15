<template>
  <div>
    <div v-if="!user">
      <h2>User profile failed to load</h2>
    </div>
    <div v-else-if="user.userName.length">
      <UserProfile :user="user"></UserProfile>
    </div>
    <div v-else>
      <h2>User not found</h2>
    </div> <!-- TODO add loading for user -->
    <br>
    <br>
    <div class="row">
        <FriendsList class="column" :user="user?.id"/>
        <AchievementsList class="column" :user="user?.id"/>
    </div>
      <MatchHistory class="matchHistory" :user="user?.id"/>
  </div>
</template>

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
import { loginStatusStore } from '../stores/profileData'
import  UserProfile from '../components/UserProfile.vue';
import AchievementsList from '../components/AchievementsList.vue'
import FriendsList from '../components/FriendsList.vue';
import MatchHistory from '../components/MatchHistory.vue';


export default defineComponent({
  name: 'ProfileView',
  props: {
    },
    methods: {
      async loadUserData(id: string) {
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
      login: {}
    }
  },
  async mounted() {
    await this.loadUserData(this.$route.params.id[0]);     
    this.login = loginStatusStore();
	
  },
  components: {
    UserProfile,
    AchievementsList,
    FriendsList,
    MatchHistory
},
});

</script>
