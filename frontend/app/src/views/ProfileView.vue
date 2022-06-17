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
    <div class="column">
      Friends
    </div>
    <div class="column">
      Achievements
      <AchievementsList/>
    </div>
    </div>
  </div>
</template>

<style scoped>
.profilePicture {
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20%;
  height: 200px;
  width: 200px;
  border: solid;
  border-width: 3px;
}

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


</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginStatusStore } from '../stores/profileData'
import  UserProfile from '../components/UserProfile.vue';
import AchievementsList from '../components/AchievementsList.vue'


export default defineComponent({
  name: 'ProfileView',
  props: {
    },
    methods: {
      async loadUserData(id: string) {
        fetch('http://localhost:3000/users/' + id)
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
    this.login = loginStatusStore()
  },
  components: {
    UserProfile,
    AchievementsList,
  },
});

</script>
