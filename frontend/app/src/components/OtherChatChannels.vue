<template>
	<div class ="otherChatChannels">
		<div id="title">
			<h5>Other Channels</h5>
		</div>
		<div v-if="!otherChatChannels">
			<h5 class="no-channels-msg">Loading channels</h5>
		</div>
		<div id="channels" v-else-if="otherChatChannels?.length">
			<ul class="listed-channel" v-for="channel in otherChatChannels" :key="channel.id">
				<div><h5 class="name">{{channel.name}}</h5></div>
				<div id="buttons">
					<SmallButton v-if="channel.type === 'public'" class="button" text="join" @click="this.$emit('joinChannel',channel.id)"/>
					<SmallButton v-if="channel.type === 'protected'" class="button" text="join with password" @click="requestPassword(channel.id, channel.name)"/>
					<dialogueBox id="promptPassword" :type="boxType" :channel_id="this.channel_id"
							:channel_name="this.channel_name"
							:show="showDialogue" @close-dialogue="hideDialogue" 
							@password-entered="verifyPassword" />
				</div>
			</ul>
		</div>
		<div v-else>
			<h5 class="no-channels-msg">No other channels exist</h5>
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
		user: {
			type: Number
		},
	},
    data() {
        return {
			boxType: "enterPassword",
			showDialogue: false,
			channel_id: 0,
			channel_name: "",
			loginStatusStore: loginStatusStore(),
            otherChatChannels: null as null | Array<any>,
			interval: 0
        };
    },
	mounted () {
		this.updateOtherChannels(this.user as number);
		this.interval = setInterval(() => {
			this.updateOtherChannels(this.user as number);
		}, 5000);
	},
	unmounted() {
		clearInterval(this.interval);
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
			this.showDialogue = true;
			this.channel_id = channel_id;
			this.channel_name = channel_name;
		},
		verifyPassword(verified: boolean, password:string) {
			if (verified) {
				console.log(password);
				this.$emit('joinChannel',this.channel_id, password);
				password = "";
				this.hideDialogue();
			}
			else
				alert('Wrong password')
		},
		async updateOtherChannels(user_id: number) {
			if (user_id == undefined) { return }
			fetch("/api/channels/all_not_for_" + user_id)
				.then(res => res.json())
				.then(data => this.otherChatChannels = data)
				.catch(err => {
				this.otherChatChannels = null;
				console.log(err);})
		},
	},
	emits: ['joinChannel']
})

</script>

<style scoped>
.otherChatChannels {
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
	min-width: 330px;
	max-width: 450px;
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

.no-channels-msg {
	margin-left: 40px;
}

</style>
