<template>
	<div class ="mychatchannels">
		<h3>Your Channels</h3>
		<div v-if="!myChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div v-else-if="myChatChannels?.length">
			<div v-for="channel in myChatChannels" :key="channel.id">
				<section class="listed-channel">
					<h5 class="name">{{channel?.name}}</h5>
					<!-- WHY IS THE NAME NOT DISPLAYING FFS -->
					<SmallButton  class="button" text="open" @click="loggy(channel.name)"/>
					<SmallButton  class="button" text="leave" @click="leaveChannel(channel.id)"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h5>You are not in any channels yet</h5>
		</div>
		<SmallButton text="Create new channel"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
    name: "MyChatChannels",
    props: {
        user: {
            type: Number
        },
    },
    data() {
        return {
            myChatChannels: null,
			loginStatusStore: loginStatusStore(),
        };
    },
	mounted() { 
		fetch("/api/channels/all_for_" + this.user)
			.then(res => res.json())
			.then(data => this.myChatChannels = data)
			.catch(err => {
			console.log(err);
		});		
	},
    watch: {
        user: {
            handler(newValue) {
                if (!newValue) {
                    return;
                }
				this.updateMyChannels(newValue);
            },
            immediate: true
        }
    },
    components: { SmallButton 
	},
	methods: {
		async leaveChannel(channel_id: number) {
				const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	participant_id: this.loginStatusStore.loggedInStatus?.userID,
										channel_id: channel_id}) 
			};
			fetch('/api/participants', requestOptions)
				.then(response => response)
				.catch(err => console.log(err));
			this.updateMyChannels(this.user as number)
			this.updateMyChannels(this.user as number)
		},
		async updateMyChannels(user_id: number) {
                fetch("/api/channels/all_for_" + user_id)
                    .then(res => res.json())
                    .then(data => this.myChatChannels = data)
                    .catch(err => {
                    this.myChatChannels = null;
                    console.log(err);
                });
		},
		loggy(name: string){
			console.log(name);
			
		}
	}
})

</script>

<style scoped>
.mychatchannels {
	margin-left: 50px;
}

.listed-channel{
	float: left;
	display: inline-block;
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
