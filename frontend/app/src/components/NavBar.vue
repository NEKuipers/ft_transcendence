<template>
	<div>
			<div class="navbar">
				<nav>
					<router-link to="/">Home</router-link>
					<router-link to="/myprofile">My Profile</router-link>
					<router-link to="/pong">Pong</router-link>
					<router-link to="/chat">Chat</router-link>
					<router-link to="/users">Users</router-link>
					<router-link to="/leaderboard">Leaderboard</router-link>
					<router-link to="/about">About</router-link>
					<h1 class="title">ft_transcendence</h1>
				</nav>
			</div>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavBar',
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

</style>
