<template>
	<div class ="mychatchannels">
		<h3>Your Channels</h3>
		<div v-if="!myChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div v-else-if="myChannels?.length">
			<div v-for="channel in myChannels" :key="channel.id">
				<section class="listed-channel">
					<h5 class="name">{{ channel[0].name }}</h5>
					<!-- WHY IS THE NAME NOT DISPLAYING FFS -->
					<SmallButton  class="button" text="open" @click="openChat(channel[0].id)"/>
					<SmallButton  class="button" text="leave" @click="leaveChannel(channel[0].id)"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h5>You are not in any channels yet</h5>
		</div>
		<SmallButton text="Create new channel" @click="createChannel"/>
		<DialogueBox :type="boxType" :show="showDialogue" @close-dialogue="hideDialogue" @new-name="saveChannel"/>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';
import DialogueBox from './DialogueBox.vue'


export default defineComponent({
    name: "MyChatChannels",
    props: {
        user: {
            type: Number
        },
    },
    data() {
        return {
			showDialogue: false,
			boxType: "",
            myChannels: null,
			loginStatusStore: loginStatusStore(),
        };
    },
	mounted() { 
		fetch("/api/channels/all_for_" + this.user)
			.then(res => res.json())
			.then(data => { console.log('Yo wtf', data) ; this.myChannels = data })
			.catch(err => console.log('Error fetching channels for user ', err))
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
    components: { 
		SmallButton,
		DialogueBox,
	},
	methods: {
		hideDialogue() {
			this.showDialogue = false;
		},
		async createChannel() {
			this.boxType = "createChannel";
			this.showDialogue = true;
		},
		async saveChannel(newname: string) {
			const id = this.loginStatusStore.loggedInStatus?.userID
			if (id != undefined) {
				await fetch('/api/channels/', {
					method: "POST",
					body: JSON.stringify({
						"name": newname,
						"is_closed": false,
						"owner_id": id,
						"type": "public"
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
				.then(res => res.text())
				.then(data => {
					if (data === 'taken')
						alert('That channel name is already taken.')
					else {
							const requestOptions = {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({	participant_id: this.loginStatusStore.loggedInStatus?.userID,
													channel_id: parseInt(data)}) 
						};
						fetch('/api/participants', requestOptions)
							.then(response => response)
							.catch(err => console.log(err));
						this.hideDialogue();
					}
				})
				.catch(err => console.log(err));
			}
		},
		async leaveChannel(channel_id: number) {
			console.log('Channel id:', channel_id)
			const requestOptions = {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({	participant_id: this.loginStatusStore.loggedInStatus?.userID,
									channel_id: channel_id}) 
			};
			fetch('/api/participants', requestOptions)
				.then(response => response)
				.catch(err => console.log(err));
			console.log('channels', this.myChannels)
			this.updateMyChannels(this.user as number)
			// this.updateMyChannels(this.user as number)
		},
		async updateMyChannels(user_id: number) {
                fetch("/api/channels/all_for_" + user_id)
                    .then(res => res.json())
                    .then(data => this.myChannels = data)
                    .catch(err => {
                    this.myChannels = null;
                    console.log(err);
                });
		},
		openChat(channel_id: number) {
			// console.log('Opening chat', channel_id)
			this.$emit('open-chat', channel_id)
		}
	},
	emits: ['open-chat']
})

</script>

<style scoped>
.mychatchannels {
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
