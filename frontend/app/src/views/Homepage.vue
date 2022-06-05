<template>
	<div class="homepage">
		<h1 class="title">A WEBSITE THAT HAS THE 1972 ATARI GAME PONG</h1>
		<h4 class="subtitle">That's right: it's been 50 years of this game, motherfucker</h4>
		<a>
			<img src="../assets/pingpong.jpeg" alt="motherfucking pingpong" width="700">

		</a>


		<p class="paragraph">It's a stock photo of the physical game, which has nothing to do with this website. Doesn't matter. You know what game it is.</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		
	},
	name: 'Homepage',
});
</script>

<style scoped>

.title {
	padding:14px;
	text-align: center;
}

.paragraph {
	margin:20px 300px;
	text-align: center;
}

</style>
