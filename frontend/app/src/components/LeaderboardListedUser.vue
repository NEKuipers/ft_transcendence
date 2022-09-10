<template>
	<div class="listed-user">
		<div id="rankingNameAndAvatar">
			<h3 id="ranking">{{profile?.ranking}}</h3>
			<img class="profilePictureThumbnail" width="50" height="50" v-bind:src="'/api/avatars/' + profile?.avatar_id">
			<h3 class="username" v-bind:href="'/profile/' + profile?.user_id">{{profile?.username}}</h3>
		</div>
		<h4 class="game-stats">Games played: {{profile?.games_won + profile?.games_lost}} | Wins: {{profile?.games_won}} | Losses: {{profile?.games_lost}}</h4>
		<img class="medal" v-if="profile?.ranking===1" height="65" width="55" src="../assets/gold.png">
		<img class="medal" v-else-if="profile?.ranking===2" height="65" width="55" src="../assets/silver.png">
		<img class="medal" v-else-if="profile?.ranking===3" height="65" width="55" src="../assets/bronze.png">
		<img class="medal" v-else height="65" width="55" src="../assets/none.png">

	</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LeaderboardListedUser',
	props: {
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
	min-width: 22px;
}

.medal {
	float:right;
}

.listed-user {
	background-color: #f3f3f3;
	display: flex;
	flex-direction: row;
	/* justify-content: space-between;  */
	align-items: center;
	justify-content: center;
}

.profilePictureThumbnail {
	margin-top: 8px;
	float: left;
	margin-left: 10px;

}

.username {
	float: left;
	margin-left: 10px;

}

.game-stats {
	margin: auto;
	min-width: 20%;
	padding-left:50px;
	padding-right: 50px;
	font-size: 16px;
}
</style>
