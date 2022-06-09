<template>
  <div class="game">
    <h1>Let's play!</h1>
    <!-- <img alt="Vue logo" src="../assets/pong-video-game.gif"> -->
    <body>
      <canvas id="canvas" width="600" height="400" style="border: 1px solid black;">
      </canvas>
    </body>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PongView',
  methods: {
    drawOnCanvas() {
      return;
    },
  },
})
</script>
