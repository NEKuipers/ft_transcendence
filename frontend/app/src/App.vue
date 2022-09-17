<template>
	<div>
		<NavBar/>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';
import { loginStatusStore } from './stores/profileData';


export default defineComponent({
	name: 'App',
	components: {
		NavBar,
	},
	created() {
		window.addEventListener('beforeunload', () => {
			this.setOffline();
		});
	},
	mounted() {
		this.setOnline();
	},
	methods: {
		async getId() {			
			let loggedInStatus = await loginStatusStore().logIn();
			return loggedInStatus;
		},
		async setOnline() {
			let loggedInStatus = await this.getId();
			if (loggedInStatus?.userID != undefined) {
				fetch('/api/users/set_online', {method: "PATCH"});
			}
		},
		async setOffline() {
			let loggedInStatus = await this.getId();
			if (loggedInStatus?.userID != undefined) {
				fetch('/api/users/set_offline', {method: "PATCH"});
			}
		},
	}
});

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}


a {
	color: #2c3e50;
	text-decoration: none;
}


nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
