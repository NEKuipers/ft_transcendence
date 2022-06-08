<template>
  <div v-if="users">
    <div v-for="user in users" :key="user.id">
      <section class="profile">
        <UserProfile :user="user"></UserProfile>
        <div v-if="user.id != 3"> <!-- change to login-id -->
          <SmallButton class="user-btn" text="Message"></SmallButton>
          <SmallButton class="user-btn" text="Invite to game"></SmallButton>
        </div>
      </section>
    </div>
  </div>
  <div v-else>
    <h2>Loading profile</h2>
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
import { defineComponent } from 'vue';
import  UserProfile from '../components/UserProfile.vue';
import SmallButton from '../components/SmallButton.vue';

export default defineComponent({
  name: 'ProfileView',
  props: {
    },
  data () {
    return {
      selectedFile: null,
      users: null,
    }
  },
  mounted() {
    fetch('http://localhost:3000/users/')
    .then(res => res.json())
    .then(data => this.users = data)
    .catch(err => console.log(err));
  },
  components: {
    UserProfile,
    SmallButton
  },
  methods: {

  },
});

</script>

<style scoped>
.profile {
  float:left;
  width: 25%;
  padding: 10px;
  box-sizing: border-box;

}

.user-btn {
  margin-left: 5px;
  margin-right: 5px;
}

</style>