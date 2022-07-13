<template>
	<div>
		<h1 id="title">Select a game mode</h1>
		<div class="buttons">
			<div class="button-with-explanation">
				<router-link to="/pong/classic">
					<large-button class="game-button" text="Classic"/>
				</router-link>
				<h3>That classic game of Pong we all know and love.</h3>
			</div>
			<div class="button-with-explanation">
				<router-link to="/pong/speedup">
					<large-button class="game-button" text="Speedup"/>
				</router-link>
				<h3>Pong, but with a slight speed increase.</h3>
			</div>
			<div class="button-with-explanation">
				<router-link to="/pong/rush">
					<large-button class="game-button" text="Rush"/>
				</router-link>
				<h3>Pong, for the impatient</h3>
			</div>
			<div class="button-with-explanation">
				<router-link to="/pong/expert">
					<large-button class="game-button" text="Expert"/>
				</router-link>
				<h3>Expert mode, small paddles, slow move speed</h3>
			</div>
		</div>
		<br><br><br>
		<div class="spectate">
			<h2>Or choose a current game to spectate:</h2>
			<div v-if="matches.length > 0">
			<ul class="active-games" v-for="match in matches" :key="match.match_id">
				<div class="listed-game-ctr">
				<li class="listed-game" >MATCH #{{match.match_id}} | {{match.mode}} | <b>{{match.player_one}}</b> vs <b>{{match.player_two}}</b> | <a class="link" :href="'/pong/match:' + match.match_id">SPECTATE</a></li>
				</div>
			</ul>
			</div>
			<div v-else>
				<h1>No matches currently ongoing.</h1>
			</div>
		</div>
	</div>	
</template>

<script lang="ts">
  /*
  list of data requirements (fetch() calls) for this view:
  GET:
	List of currently ongoing matches, based on/containing the following db info:
	- Users
		* id
		* username
	- Matches
		* id
		* player_one
		* player_two
		* meta (when did the game begin? only list ones without endtime. possibly add score)
		* options (which gamemode?)
	
	ideally, the view contains all currently ongoing games (which ones have a meta=>start_time but no end_time? ) with match ID, player one's username, player two's username, and the gamemode. Example below.
  */
import { defineComponent } from 'vue'
import LargeButton from '../components/LargeButton.vue'

type Match = {
	readonly match_id: number;
	player_one: string;
	player_two: string;
	mode: string;
}

export default defineComponent({
	name: 'GameSelectView',
	components: {
		LargeButton,
	},
	data() {
		return {
			matches: Object as () => Match,
			handle: -1,
		}
	},

	mounted() {
		this.refreshOngoing();

		this.handle = setInterval(() => {
			this.refreshOngoing();
		}, 2500);

	},

	unmounted() {
		clearInterval(this.handle);
	},

	methods: {
		refreshOngoing() {
			console.log("Getting all ongoing matches!");

			fetch('api/matches/ongoing')
				.then(res => res.json())
				.then(data => this.matches = data.sort((a:Match ,b:Match) => a.match_id - b.match_id))
				.catch(err => console.log(err))
		}
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

#title {
	font-size: 50px;
}
.listed-game-ctr{
	align-items: center;
	margin: 0 auto 0 auto;
	width: 50%;
	text-align: center;
	border-width: 5px;
	border-radius: 50px;
	border-style: solid;
	border-color: #2c3e50;
	padding-bottom: 50px;
	background: #f3f3f3;
}

.active-games {
	list-style: none;
}

.listed-game{
	margin-top: 60px;
	font-size: 25px;
}

.link {
	text-decoration: none;
	color: #2c3e50;
	font-weight: bold;
}

.link:hover {
	text-decoration: underline;
}

</style>
