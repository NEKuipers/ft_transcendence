<template>
	<div class ="mychatchannels">
		<div id="title">
			<h5>Your Channels</h5>
		</div>
		<div v-if="!myChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div id="channels" v-else-if="myChannels?.length">
			<ul class="listed-channel" v-for="channel in myChannels" :key="channel.id">
				<div><h5 class="name">{{ channel.name }}</h5></div>
				<div id="buttons">
					<SmallButton  class="button" text="open" @click="openChat(channel.id)"/>
					<SmallButton  class="button" text="leave" @click="this.$emit('leaveChannel', channel.id, channel.name)"/>
				</div>
			</ul>
		</div>
		<div v-else>
			<h5>You are not in any channels yet</h5>
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
		myChannels: {
			type: Array
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
			
			await fetch("/api/channels/all")
				.then(res => res.json())
				.then(data => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].name == newname) {
							alert("A channel by that name already exists.")
						}
					}
				})
			if (newname.length > 22) {
				return alert("Channel names may not be longer than 22 characters.");
			} else if (newpassword) {
				if (newpassword.length < 4 ) {
					return alert("Password is too short. Password should be between 4 and 22 characters.");
				} else if (newpassword.length > 22) {
					return alert("Password is too long. Password should be between 4 and 22 characters.")
				}
				this.$emit('createChannel', newname, newpassword)
			} else {
				this.$emit('createChannel', newname);
			}
			this.hideDialogue();
		},
		openChat(channel_id: number) {
			// console.log('Opening chat', channel_id)
			this.$emit('open-chat', channel_id)
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
	justify-content: space-between;
	font-size: large;
	box-sizing: border-box;
	align-items: flex-start;
	max-height: 40px;
	margin-top: 0px;
	margin-bottom: 0px;
}

.name {
	margin-top: 0px;
	display: flex;
}

#buttons {
	display: flex;
	margin-left:30px;
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
