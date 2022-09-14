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
			let checkIfReload = (performance.getEntries()[0] as PerformanceNavigationTiming).type == "reload";
			console.log(checkIfReload)
			if (checkIfReload == false) {
				loginStatusStore().logOut();
			}
		});
	},
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
