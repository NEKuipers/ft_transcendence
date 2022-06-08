<template>
  <div v-if="user">
    <UserProfile :user="user"></UserProfile>
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

export default defineComponent({
  name: 'ProfileView',
  props: {
    },
  data () {
    return {
      selectedFile: null,
      user: null,
    }
  },
  mounted() {
    let id = '3'; // This variable directs you to various profiles
    fetch('http://localhost:3000/users/' + id)
    .then(res => res.json())
    .then(data => this.user = data)
    .catch(err => console.log(err));
  },
  components: {
    UserProfile,
  },
  methods: {

  },
});

</script>
