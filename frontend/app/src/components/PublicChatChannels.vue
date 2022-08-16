<template>
	<div class ="publicchatchannels">
		<h3>Public Channels</h3>
		<div v-if="!publicChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div v-else-if="publicChatChannels?.length">
			<div v-for="channel in publicChatChannels" :key="channel.id">
				<section class="listed-channel">
					<h5 class="name">{{channel.name}}</h5>
					<SmallButton class="button" text="join" @click="joinChannel(channel.id)"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h5>No public channels available</h5>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
    name: "PublicChatChannels",
    props: {
		user: Object
    },
    data() {
        return {
			loginStatusStore: loginStatusStore(),
            publicChatChannels: null as null | Array<any>,
        };
    },
	mounted() { 
		fetch("/api/channels/public")
			.then(res => res.json())
			.then(data => this.publicChatChannels = data)
			.catch(err => {
			this.publicChatChannels = null;
			console.log(err);
		});
		
	},
    components: { SmallButton 
	},
	methods: {
		async joinChannel(channel_id: number) {
				const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	participant_id: this.loginStatusStore.loggedInStatus?.userID,
										channel_id: channel_id}) 
			};
			fetch('/api/participants', requestOptions)
				.then(response => response)
				.catch(err => console.log(err));
		}
	}
})

</script>

<style scoped>
.publicchatchannels {
	margin-left: 50px;
}

.listed-channel{
	float: left;
	/* display: inline-block; */
}

.button {
	float: left;
	margin-left:8px;
}
.name {
	margin-top: -4px;
	float: left;
}
</style>
