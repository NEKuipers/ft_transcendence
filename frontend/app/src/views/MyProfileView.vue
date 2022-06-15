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
    </div>
    <div class="column">
      Blocked Users
    </div>
    </div>
  </div>
</template>

<style scoped>

.column {
  float: left;
  width: 33.33%;
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
import  UserProfile from '../components/UserProfile.vue';

export default defineComponent({
  name: 'MyProfileView',
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
    }
  },
  async mounted() {
    let g_login_id = '3'; //TODO This variable directs you to various profiles, need to fix
    await this.loadUserData(g_login_id); //TODO this still works kind of weird, make sure page reloads     
  },
  components: {
    UserProfile,
  },
});


</script>
