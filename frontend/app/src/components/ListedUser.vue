<template>
	<div class="listed-user">
		<h3 id="ranking">{{ranking + 1}}</h3>
		<img class="profilePictureThumbnail" width="50" height="50" src="../assets/Profile-picture-default.png">
		<h3 class="username"><a v-bind:href="'http://localhost:8080/profile/' + user.id">{{user.username}}</a></h3>
		<h4 class="game-stats">Games played: {{user.gamesPlayed}} | Wins: {{user.gamesWon}} | Losses: {{user.gamesLost}}</h4>
		<img class="medal" v-if="ranking+1===1" height="65" width="55" src="../assets/gold.png">
		<img class="medal" v-if="ranking+1===2" height="65" width="55" src="../assets/silver.png">
		<img class="medal" v-if="ranking+1===3" height="65" width="55" src="../assets/bronze.png">
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
	display: inline-block;

}

.medal {
	float:right;
	display: inline-block;
}
.listed-user {
	background-color: #f3f3f3;
}



.profilePictureThumbnail {
	float:left;
	margin-left: 10px;
	display: inline-block;

}

.username {
	float:left;
	margin-left: 10px;
	display: inline-block;

}

.game-stats {
	font-size: 16px;

	float:center;
	display: inline-block;
}

</style>
