<template>
	<div class ="matchhistorylist">
		<h3>Match History</h3>
		<div v-if="matches">
		<!-- Need to figure out how to filter only matches of logged in user! -->
			<div v-for="match in matches" :key="match.id">
				<section class="listed-match">
					<h1>{{match.player_one}} vs {{match.player_two}} | Gamemode: {{match.mode}} | Final score: {{match.player_one_score}} - {{match.player_two_score}}</h1>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No match history found</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MatchHistory',
	props: {},
	data () {
		return {
			matches: null,
		}
	},
	mounted() {
	fetch('api/matches/')
	.then(res => res.json())
	.then(data => this.matches = data)
	.catch(err => console.log(err));    
	},	
})

</script>

<style scoped>
.matchhistorylist {
	height:30px;
	margin: 0;
	margin-top: 200px;
	margin-bottom: 400px;
	clear: both;
	width:100%;
}
</style>
