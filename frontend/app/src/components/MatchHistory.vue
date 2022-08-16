<template>
	<div class ="matchhistorylist">
		<h3>Match History</h3>
		<div v-if="!matches">
			<h3>Match history failed to load</h3>
		</div>
		<div v-else-if="matches?.length">
			<div v-for="match in matches" :key="match.id">
				<section class="listed-match">
					<h1>{{match.p1_name}} vs {{match.p2_name}} | Gamemode: {{match.game_mode}} | Final score: {{match.p1_points}} - {{match.p2_points}}</h1>
				</section>
			</div>
		</div>
		<div v-else>
			<h3>No games played yet</h3>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MatchHistory',
	props: {
		// Who to view the history of?
		user: {
			type: Number
		},
	},
	data () {
		return {
			matches: null as any,
		}
	},

	// Setup a watch to run whenever the user property changes, so we can re-fetch the data
	watch: {
		user: {
			handler(newValue) {
				if (!newValue) { return; }	// It can be undefined at the start
				fetch('/api/matches/last/' + this.user)
					.then(res => res.json())
					.then(data => this.matches = data)
					.catch(err => {
						this.matches = null;
						console.log(err);
					});
			},
			immediate: true
		}
	}
})

</script>

<style scoped>
.matchhistorylist {
	height:30px;
	margin-top: 50px;
	margin-bottom: 400px;
	clear: both;
	width:100%;
}

</style>
