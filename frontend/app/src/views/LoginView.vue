<template>
  <div class="home">
    <h1>Login required</h1>
    <img height="300" width="300" alt="pingpong" src="../assets/atari-joystick.jpg">
    <br>
    <button @click="OAuthLogin">Login to Intra</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginStatusStore } from '../stores/profileData'

export default defineComponent({
	name: 'LoginView',
	async mounted() {
		// Redirect to home screen if already logged in
		let status = loginStatusStore();
		if (await status.logIn()) {
			this.$router.push('/');
		}
	},
	methods: {
		OAuthLogin() {
			window.location.href = '/api/login'
		}
	},
});
</script>