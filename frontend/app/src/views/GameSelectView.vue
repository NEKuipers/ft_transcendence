<template>
	<div>
		<h1>Select a game mode</h1>
		<div class="buttons">
			<div class="button-with-explanation">
				<router-link to="pong">
					<large-button class="game-button" text="Classic" />
				</router-link>
				<p>The classic game of Pong we all know and love.</p>
			</div>
			<div class="button-with-explanation">
				<router-link to="pong">
					<large-button class="game-button" text="HyperPong"/>
				</router-link>
					<p>Pong, but with some adjustments (Jasper, feel free to explain what you've come up with here).</p>
			</div>
		</div>
		<div class="spectate">
			<h2>Or choose a current game to spectate:</h2>
			<ul class="active-games">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>

			</ul>
		</div>
	</div>	
</template>

<script lang="ts">
  /*
  list of data requirements (fetch() calls) for this view:
  GET:
    - Users
      * id
      * username
    
    - Avatars
      * id
      * user_id
      * img
  
  POST:
    - Avatars

  PATCH:
    - Users
  */
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
.button-with-explanation {
	width: 50%;
	float:left;
	box-sizing: border-box;
	padding: 30px;
}

.spectate {
	margin:200px;
}

</style>
