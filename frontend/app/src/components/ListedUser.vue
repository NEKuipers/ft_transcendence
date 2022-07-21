<template>
	<div class="listed-user">
		<h3 id="ranking">{{ranking}}</h3>
		<!-- TODO add profile picture -->
		<img class="profilePictureThumbnail" width="50" height="50" src="../assets/Profile-picture-default.png"> 
		<h3 class="username"><a v-bind:href="'http://localhost:8080/profile/' + profile?.user_id">{{profile?.username}}</a></h3>
		<h4 class="game-stats">Games played: {{profile?.games_won + profile?.games_lost}} | Wins: {{profile?.games_won}} | Losses: {{profile?.games_lost}}</h4>
		<img class="medal" v-if="ranking===1" height="65" width="55" src="../assets/gold.png">
		<img class="medal" v-if="ranking===2" height="65" width="55" src="../assets/silver.png">
		<img class="medal" v-if="ranking===3" height="65" width="55" src="../assets/bronze.png">
	</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ListedUser',
	props: {
		ranking: Number,
		profile: Object,
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
	float: left;
	margin-left: 10px;
	display: inline-block;

}

.username {
	float: left;
	margin-left: 10px;
	display: inline-block;

}

.game-stats {
	font-size: 16px;

	float:center;
	display: inline-block;
}

</style>
