<template>
	<div class ="mychatchannels">
		<div id="title">
			<h5>Your Channels</h5>
		</div>
		<div v-if="!myChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div id="channels" v-else>
			<div v-if="myChannels?.length">
				<div>
					<ul class="listed-channel" v-for="channel in myChannels" :key="channel.id">
						<div>
							<h5 class="name">{{ channel.name }}</h5>
							<SmallButton  class="button" text="open" @click="openChat(channel.id)"/>
							<SmallButton  class="button" text="leave" @click="this.$emit('leaveChannel', channel.id)"/>
						</div>
					</ul>
				</div>
			</div>
			<div v-else>
				<h5>You are not in any channels yet</h5>
			</div>
			<div id="createchannel">
				<SmallButton text="Create new channel" @click="createChannel"/>
				<DialogueBox id="createChannelDialogueBox" :type="boxType" :show="showDialogue" @close-dialogue="hideDialogue" @new-name="saveChannel"/>
			</div>
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
			if (newpassword === undefined)
				this.$emit('createChannel', newname);
			else
				this.$emit('createChannel', newname, newpassword)
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
	margin-top: 0px;
	margin-bottom: 0px;
	/* border-style: solid; */
	font-size:large;
	/* border-width: 1px; */
	/* justify-items: space-between; */
	box-sizing: border-box;
	align-items: flex-start;
	/* border-color: red; */
	/* flex-direction: column; */
	/* display: inline-block; */
}

.name {
	float: left;
}

.button {
	float: left;
	margin-left:8px;
	margin-top: 20px;
}

#title {
	margin-left:20px;
}

#channels {
	max-height: 250px;
	align-content: center;

}

#createchannel {
	width: 100%;
	float: bottom;
	display: flex;
	flex-direction: column;
}

</style>
