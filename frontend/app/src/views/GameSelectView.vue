<template>
	<div>
		<h1>Select a game mode</h1>
		<div class="buttons">
			<router-link to="pong">
				<large-button class="game-button" text="Classic" />
			</router-link>
			<router-link to="pong">
				<large-button class="game-button" text="HyperPong"/>
			</router-link>
		</div>
	</div>	
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LargeButton from '../components/LargeButton.vue'

export default defineComponent({
	name: 'GameSelectView',
	components: {
		LargeButton,
	}

})
</script>

<style scoped>
.buttons {
	width: 100%;
}

</style>
