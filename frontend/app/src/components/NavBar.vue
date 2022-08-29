<template>
	<div>
			<div class="navbar">
				<nav>
					<router-link to="/">Home</router-link>
					<router-link to="/myprofile">My Profile</router-link>
					<router-link to="/select-game">Play</router-link>
					<router-link to="/chat">Chat</router-link>
					<router-link to="/users">Users</router-link>
					<router-link to="/leaderboard">Leaderboard</router-link>
					<router-link to="/about">About</router-link>
					<h1 class="title">ft_transcendenceeeeee</h1>
					<div v-if="loginStatusStore.loggedInStatus">
					<LargeButton @click="logout" class="logout" text="Log out"></LargeButton>
					</div>
				</nav>
			</div>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LargeButton from './LargeButton.vue'
import { loginStatusStore } from '../stores/profileData'

export default defineComponent({
    name: "NavBar",
    methods: {
		async logout() {
			await this.loginStatusStore.logOut();
			this.$router.push("/login");
		}
    },
    components: { LargeButton },
	async mounted() {
		// We need to know
		if (!await this.loginStatusStore.logIn()) {
			console.log("Failed to login!")
			this.$router.push("/login")
		}
	},
	data () {
		return {
			loginStatusStore: loginStatusStore(),
		}
	},
});
</script>

<style scoped>
.navbar{
	background-color: rgb(16, 25, 70);
	overflow: hidden;
	color: #f2f2f2;
	padding: 15px;
	margin-bottom: 20px;
}

.navbar a{
	color: #f2f2f2;
	padding: 15px;
	float:left;
	font-size: 26px;
	text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logout	{
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: bold;
	float:top;
	position: absolute;
	top: 60px;
	right: 30px;
}
</style>
