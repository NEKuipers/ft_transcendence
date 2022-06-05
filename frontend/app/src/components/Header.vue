<template>
	<div class="navbar">
		<a href="#">Home</a>
		<a href="#">Login</a>
		<a href="#">Play</a>
		<a href="#">Users</a>
		<a href="#">Chat</a>
		<a href="#">About</a>
		<h1 class="title">ft_transcendence</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		
	},
	name: 'Header',
});
</script>

<style scoped>
.navbar {
	background-color: #333;
	overflow: hidden;
	color: #fff;

}

.title {
	padding:14px;
}

.navbar a{
	float:left;
	color: #f2f2f2;
	padding: 14px;
	font-size: 26px;
	text-decoration: none;
}

</style>
