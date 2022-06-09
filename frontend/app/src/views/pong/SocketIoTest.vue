<template>
	<div>
		<p>TODO: Because the connect event is only fired once we actually connect, and we connect as soon as we load the home page, the event is not triggered, thus not setting the isConnected flag, startign on this page works fine though</p>
		<p v-if="isConnected">We're connected to the server!</p>
		<p v-else>Not connected to the server!</p>
		<p>Message from server: "{{socketMessage}}"</p>
		<button @click="pingServer()">Ping Server</button>
	</div>
</template>

<script lang = "ts">

export default {
	data() {
		return {
			isConnected: false,
			socketMessage: ''
		}
	},

	sockets: {
		connect: function () {
			console.log('socket connected')	

			this.isConnected = true;
		},
		disconnect() {
			console.log("socket disconnected!");
			this.isConnected = false;
		},

		customEmit: function (data) {
			console.log("this method was fired by the socket server. eg: io.emit(\"customEmit\", {"+data+"})");
			this.socketMessage = data;
		}
	},

	methods: {
        pingServer: function (data) {
            // $socket is socket.io-client instance
            this.$socket.emit('message', "client data")
        }
    }
}
</script>