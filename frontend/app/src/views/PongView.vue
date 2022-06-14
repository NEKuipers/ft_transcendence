<template>
	<div class="game">
		<h1>Let's play!</h1>
		<SocketIoConnection ref="connection" uri=":4113" server_name="pong server"/>
		<img alt="Vue logo" src="../assets/pong-video-game.gif">
		<canvas id="c"></canvas>
	</div>
</template>

<script lang="ts">

import SocketIoConnection from '../components/SocketIoConnection.vue';
export default {
	components: {
		SocketIoConnection
	},

	mounted() {
		let socket = this.$refs.connection.socket;
		
		socket.on("connect", () => {
			console.log("Connecteeed via extra event")
		})
		socket.on("customEmit", (data : string) => {
			console.log("Got custom emit data via extra event:", data);
		});

		socket.emit('message', "extra client dataaas")
	},
}

</script>
