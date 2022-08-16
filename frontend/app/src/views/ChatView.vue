<template>
	<div>
		<div class="container">
			<div class="column" id="left-column">
				<div id="channels">
					<MyChatChannels @open-chat="openChat"  :user="loginStatusStore.loggedInStatus?.userID" />
				</div>
				<div id="channels">
					<PublicChatChannels/>
				</div>
				<div id="friends">
					<ChatFriendsList :user="loginStatusStore.loggedInStatus?.userID" />
				</div>
			</div>
			<div class="column" id="center_column">
				<div>
					<ChatBox :channel_id="currentChannel" />
				</div>
			</div>
			<div class="column" id="channel-overview">
				Channel overview
				<ChannelOverview :channel_id="currentChannel"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ChatFriendsList from "../components/ChatFriendsList.vue";
import PublicChatChannels from "../components/PublicChatChannels.vue";
import MyChatChannels from "../components/MyChatChannels.vue";
import { loginStatusStore } from "../stores/profileData";
import ChatBox from '../components/ChatBox.vue'
import ChannelOverview from "../components/ChannelOverview.vue";
 
export default defineComponent({
	name: 'ChatView',
	data() {
		return {
			loginStatusStore: loginStatusStore(),
			text: '',
			user: null,
			currentChannel: 0
		}
	},
	methods: {
		async loadUser(id: number) {
			fetch('/api/users/' + id)
			.then(res => res.json())
			.then(data => this.user = data)
			.catch(err => console.log('What is: ' + err));
		},
		openChat(channel_id: number) {
			this.currentChannel = channel_id
		}
	},
	async mounted() {
		const userID = loginStatusStore().loggedInStatus?.userID
		if (userID)
			await this.loadUser(userID)
	},
	components: {
    ChatFriendsList,
    PublicChatChannels,
    MyChatChannels,
    ChatBox,
    ChannelOverview
},
})

</script>

<style scoped>

* {
	box-sizing: border-box;
}

.container {
	display: flex;
	gap: 20px;
}

.row {
	margin-left: 60px;
	margin-right: 60px;
}

.column {
	background-color: #f4f4f4;
	display: flex;
	flex-direction:column;
	float:left;
	padding:10px;
	box-sizing: border-box; /*this adds the border+padding into the width. can also look at flexbox*/
	height: 850px;
}

#left-column {
	display: flex;
	gap: 10px;
	width: 20%;
	background-color: white;
}

#center_column {
	width: 65%;
	background-color: #f4f4f4;
}

#input-box {
	margin-top: 20px;
	width: 80%;
	height:45px;
	font-size: 20px;
}

#channels {
	display: flex;
	justify-content: left;
	font-size: 30px;
	height: 50%;
	row-gap: 10px;
	border: 5px solid white;
	border-radius: 5px;
	background-color: #f4f4f4;
	/* width: 20%; */
}

#friends {
	display: flex;
	box-sizing: border-box;
	font-size: 15px;
	background-color: #f4f4f4;
	border: 5px solid white;
	border-radius: 5px;
	height: 50%;
	justify-content: left;
	/* width: 20%; */
}

#channel-overview {
	font-size: 30px;
	width: 20%;
}

#messages {
	padding-bottom: 100px;
	height: 850px;
	margin-left: 20px;
	margin-right: 20px;
}

#chat-column {
	height: 1000px;
	margin-left: 20px;
	margin-right: 20px;
	overflow: auto;
	/* float: center; */
	justify-content: center;
	width: 95%;
	font-size: 14pt;
	background-color: white;

	/* flex: 1 0; */
	/* flex-wrap: wrap; */
}
</style>

