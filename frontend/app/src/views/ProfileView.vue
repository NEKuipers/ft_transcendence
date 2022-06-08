<template>
  <div class="profile">
  <div>
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <SmallButton @btn-click="$emit('change-avatar')"
      :text="'Change Avatar'"></SmallButton>
    <h2>Username</h2>
      <SmallButton @btn-click="$emit('change-username')"
      :text="'Change Username'"></SmallButton>
    <h3>FirstName LastName</h3>
    <h4>Games played: 0</h4>
    <h4>Games won: 0</h4>
    <h4>Games lost: 0</h4>
  </div>
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
import SmallButton from '../components/SmallButton.vue';

export default defineComponent({
  name: 'ProfileView',
  components: {
    SmallButton,
  },
});
</script>