<template>
	<div class ="mychatchannels">
		<div id="title">
			<h5>Your Channels</h5>
		</div>
		<div v-if="!NonDmChannels">
			<h5 class="no-channels-msg">Channels failed to load</h5>
		</div>
		<div id="channels" v-else-if="NonDmChannels?.length">
			<ul class="listed-channel" v-for="channel in NonDmChannels" :key="channel.id">
				<div><h5 class="name">{{ channel.name }}</h5></div>
				<div id="buttons">
					<SmallButton  class="button" text="open" @click="openChat(channel.id)"/>
					<SmallButton  class="button" text="leave" @click="$emit('leaveChannel', channel.id, channel.name)"/>
				</div>
			</ul>
		</div>
		<div v-else>
			<h5 class="no-channels-msg">You are not in any channels
			</h5>
		</div>
		<div id="createchannel">
			<SmallButton id="createButton" text="Create new channel" @click="createChannel"/>
			<DialogueBox id="createChannelDialogueBox" :type="boxType" :show="showDialogue" @close-dialogue="hideDialogue" @new-name="saveChannel"/>
		</div>
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
		channels: {
			type: Object
		},
	},
	data() {
		return {
			showDialogue: false,
			boxType: "",
			loginStatusStore: loginStatusStore(),
		};
	},
	mounted() { // Perhaps a computed: would allow this to update immediately
		// First of all, copy paste, this is the same as `this.updateMyChannels(this.user)`
		// Second: the watch for user executes on mount because the "immediate: true", and that calls updateMyChannels, so this is just doing it twice
		/*
		fetch("/api/channels/all_for_" + this.user)
			.then(res => res.json())
			.then(data => this.myChannels = data )
			.catch(err => console.log('Error fetching channels for user ', err))
		*/
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
		async saveChannel(newname: string, newpassword: string | undefined | null) {
			console.log(newname);
			await fetch('/api/channels/check_channel_name', {
					method: "POST",
					body: JSON.stringify({"name": newname,}),
					headers: {'Content-type': 'application/json; charset=UTF-8'}})
					.then(res => res.text())
					.then(data => {
						if (data === 'taken'){
							alert('A channel by that name already exists.')
						} else if (data === 'too-long') {
							alert('That channel name is too long.')
						} else {
							if (newpassword) {
								this.$emit('createChannel', newname, newpassword);
							} else {
								this.$emit('createChannel', newname);
							}
							this.hideDialogue();
						}
					})
					.catch(err => console.log(err));	
		},
		openChat(channel_id: number) {
			// console.log('Opening chat', channel_id)
			this.$emit('open-chat', channel_id)
		}
	},
	computed: {
		NonDmChannels: function() {
			let channels = new Array<any>();
			if (this.channels) {
				for (let channel_id in this.channels) {
					if (this.channels[channel_id].type != "direct") {
						channels.push(this.channels[channel_id]);
					}
				}
			}
			return channels;
		}
	},
	emits: ['open-chat', 'leaveChannel', 'createChannel']
})

</script>

<style scoped>
.mychatchannels {
	display: flex;
	flex-direction: column;
	overflow: auto;
	align-items: flex-start;
	width: 100%;
}

.listed-channel{
	display: flex;
	flex-direction: column;
	font-size: large;
	height: 40px;
}

.name {
	margin-top: 0px;
	display: flex;
}

#buttons {
	display: flex;
	margin-left:-7px;
	margin-top: -20px;
}

.button {
	margin-left:8px;
}

#title {
	margin-left:40px;
	max-height: 45px;
	margin-bottom: 45px;
	margin-top: -10px;
}
.no-channels-msg {
	margin-left: 40px;
}

#createchannel {
	float: bottom;
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	max-width: 180px;
}

#createButton {
	margin-left: 40px;
	margin-bottom: 5px;
	max-width: 200px;
}


</style>
