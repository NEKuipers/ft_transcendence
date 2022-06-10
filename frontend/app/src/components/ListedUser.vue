<template>
	<div class="listed-user">
		<img class="profilePictureThumbnail" width="50" height="50" src="../assets/Profile-picture-default.png">
		<h3 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user.id">{{user.userName}}</a></h3>
		<span class="game-stats">
			<h4 class="stat">G: {{user.gamesPlayed}}</h4>
			<h4 class="stat">W: {{user.gamesWon}}</h4>
			<h4 class="stat">L: {{user.gamesLost}}</h4>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ListedUser',
	props: {
		user: Object,
	},
	components: {

	}
})
</script>

<style scoped>

.listed-user {
	border: 10px;
	margin-left:60px;
	float:left;
	width:100%;
}
.profilePictureThumbnail {
	float:left;
	margin-left: 10px;
}
.username {
	float:left;
	margin-left: 10px;

}
.game-stats {
	float:left;

}
.stat {
	float:left;
	margin-left: 10px;

}

</style>
