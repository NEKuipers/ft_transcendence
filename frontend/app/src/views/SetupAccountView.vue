<template>
	<div>
		<div>
			<h1>First login eh?</h1>
		</div>
		<div id="profile">
			<img class="profilePicture" v-bind:src="'/api/avatars/' + avatar_id">
			<h3> {{ profile?.username }} </h3>
		</div>
		<!-- <div>
			<form>
				<p>
			</form>
		</div> -->
	</div>
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { loginStatusStore } from "../stores/profileData"

export default defineComponent({
	name: 'SetupAccountView',
	data() {
		return {
			profile: null as null | any,
			avatar_id: 1
		}
	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn()
		if (loggedInStatus) {
			await this.loadprofile(loggedInStatus.userID) 
		} else {
			console.log("Fucked up in SetupAccount")
		}
	},
	methods: {
		async loadprofile(id: number) {
			fetch('/api/profile/' + id)
				.then(res => res.json())
				.then(data => { this.profile = data[0]; this.avatar_id = this.profile.avatar_id})
				.catch(err => console.log('Error in getting profile data', err))
		}
	}
})
</script>w

<style scoped>
.profilePicture {
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 20%;
	height: 200px;
	width: 200px;
	border: solid;
	border-width: 3px;
}

.profile {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>