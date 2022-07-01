<template>
  <div>
	<h1>Edit profile</h1>
    <div v-if="user">
      <EditUserProfile :user="user"></EditUserProfile>
    </div>
    <div v-else>
      <h2>User not found</h2>
    </div> <!-- TODO add loading for user -->
  </div>
</template>

<style>
.profilePicture {
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20%;
  height: 200px;
  width: 200px;
  border: solid;
  border-width: 3px;
}

</style>

<script lang="ts">
  /*
  list of data requirements (fetch() calls) for this view:
  GET:
    - Users
      * id
      * username
    
    - Avatars
      * id
      * user_id
      * img
  
  POST:
    - Avatars

  PATCH:
    - Users
  */
import { defineComponent } from 'vue';
import  EditUserProfile from '../components/EditUserProfile.vue';
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
  name: 'EditProfileView',
  props: {
    },
    methods: {
      async loadUserData(id: number) {
        fetch('api/users/' + id)
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
      await this.loadUserData(login.loggedInStatus.userID); //TODO this still works kind of weird, make sure page reloads
	} else {
		// We are not logged in, The router SHOULD prevent us from going here, yet we still got here
		console.error("Loading EditProfileView while not logged in!")
	}
  },
  components: {
    EditUserProfile,
  },
});

</script>
