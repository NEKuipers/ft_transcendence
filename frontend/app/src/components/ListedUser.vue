<template>
	<div class="listed-user">
		<h3 id="ranking">{{ranking + 1}}</h3>
		<img class="profilePictureThumbnail" width="50" height="50" src="../assets/Profile-picture-default.png">
		<h3 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user.id">{{user.userName}}</a></h3>
		<h4 class="game-stats">G: {{user.gamesPlayed}} W: {{user.gamesWon}} L: {{user.gamesLost}}</h4>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ListedUser',
	props: {
		user: Object,
		ranking: Number,
	},
	components: {

	}
})
</script>

<style scoped>

#ranking {
	float: left;
	margin-left:10px;
}

.listed-user {
	border: 10px;
	margin-left:60px;
	margin-right:60px;
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
	margin-left: 40px
}

</style>
