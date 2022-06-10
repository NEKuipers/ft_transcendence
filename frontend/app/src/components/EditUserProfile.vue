<template>
  <div class="userprofile">
    <img class="profilePicture" src="../assets/Profile-picture-default.png">
    <br>
    <section class="names">
	<v-dialog v-model="dialog">
		<h1 class="username">{{user.userName}}</h1>
	</v-dialog>
      <h3>{{user.firstName}} {{user.lastName}}</h3>
    </section>
    <section class="game-stats">
        <h4>Games played: {{user.gamesPlayed}}</h4>
        <h4>Games won: {{user.gamesWon}}</h4>
        <h4>Games lost: {{user.gamesLost}}</h4>
    </section>
	<div>
		<router-link to="myprofile">
			<SmallButton class="user-btn" text="Save profile" v-on:click="saveProfile()"/>
		</router-link>
	</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from '../components/SmallButton.vue'

export default defineComponent({
	name: 'EditUserProfile',
	props: {
		user: Object
	},
	components: {
		SmallButton,
	},
	methods: {
		saveProfile() {
			//TODO Change edits here
			alert("Profile saved.");
		},
	},
	data () {
		return {
			newUserName: String,
		}
	}
});
</script>

<style scoped>

.names {
  margin-top: 0px;
}

a:link{
	text-decoration: none;
}

.username {
	margin-top: 3px;
	font-size: 28px;
	text-decoration: none;
}


a:visited {
  color: #2c3e50;
}

.game-stats {
  padding: 0px;
  margin: 0px;
}

.game-stats h4 {
  padding: 0px;
  margin: 5px;
}

.user-btn {
  margin-left: 5px;
  margin-right: 5px;
}


</style>