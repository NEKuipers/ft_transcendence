<template>
  <div class="game">
    <h1>Let's play!</h1>
    <img alt="Vue logo" src="../assets/pong-video-game.gif">
	<SocketIoTest />
  </div>
</template>


<script lang="ts">

import SocketIoTest from './pong/SocketIoTest.vue';
export default {
  components: {
    SocketIoTest
  }
}

</script>