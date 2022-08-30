<template>
	<div class ="otherChatChannels">
		<div id="title">
			<h5>All Channels</h5>
		</div>
		<div v-if="!otherChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div id="channels" v-else-if="otherChatChannels?.length">
			<ul class="listed-channel" v-for="channel in otherChatChannels" :key="channel.id">
				<h5 class="name">{{channel.name}}</h5>
				<SmallButton v-if="channel.type === 'public'" class="button" text="join" @click="this.$emit('joinChannel',channel.id)"/>
				<SmallButton v-if="channel.type === 'protected'" class="button" text="join with password" @click="requestPassword(channel.id, channel.name)"/>
				<dialogueBox id="promptPassword" :type="boxType" :channel_id="this.channel_id"
						:channel_name="this.channel_name"
						:show="showDialogue" @close-dialogue="hideDialogue" 
						@password-entered="verifyPassword" />
			</ul>
		</div>
		<div v-else>
			<h5>No other channels available</h5>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'
import dialogueBox from './DialogueBox.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
    name: "OtherChatChannels",
    props: {
		user: Object
    },
    data() {
        return {
			boxType: "enterPassword",
			showDialogue: false,
			channel_id: 0,
			channel_name: "",
			loginStatusStore: loginStatusStore(),
            otherChatChannels: null as null | Array<any>,
        };
    },
	mounted() { 
		fetch("/api/channels")
			.then(res => res.json())
			.then(data => this.otherChatChannels = data)
			.catch(err => {
			this.otherChatChannels = null;
			console.log(err);
		});
		
	},
    components: { 
		SmallButton,
		dialogueBox
	},
	methods: {
		hideDialogue() {
			this.showDialogue = false;
		},
		requestPassword(channel_id: number, channel_name: string) {
			this.showDialogue = true
			this.channel_id = channel_id
			this.channel_name = channel_name
			// console.log("Requesting password for channel", this.channel_id)
		},
		verifyPassword(verified: boolean) {
			if (verified) {
				// console.log("Correct password")
			}
			else
				alert('Wrong password')
		}
	},
	emits: ['joinChannel']
})

</script>

<style scoped>
.otherChatChannels {
	display: flex;
	flex-direction: column;
	/* flex-wrap: wrap; */
	/* margin-left: 30px; */
	overflow: auto;
	align-items: flex-start;
	
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

.button {
	float: right;
	margin-left:8px;
}
.name {
	margin-top: -4px;
	float: left;
}

#title {
	margin-left: 20px;
}

#channels {
	max-height: 300px;
}
</style>
