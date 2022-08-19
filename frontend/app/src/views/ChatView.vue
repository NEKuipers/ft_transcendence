<template>
	<div>
		<ChatHandler ref="ChatHandler" uri=":4114" server_name="chat server" @serverMessage="onMessage" @join="onJoin" @leave="onLeave"/>
		<SmallButton class="send_message" text="Send a test message" @click="test"/>

		<div class="container">
			<div class="column" id="left-column">
				<div id="channels">
					<MyChatChannels @open-chat="openChat" @leaveChannel="leaveChannel" :user="loginStatusStore.loggedInStatus?.userID" />
				</div>
				<div id="channels">
					<PublicChatChannels @joinChannel="joinChannel"/>
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
  /*
  should probably rearrange this later in a more logical way
  list of data requirements (fetch() calls) for this view:
  GET:
    - Users
      * id
      * username
      * status
      * is_logged_in

    - Channels
      * id
      * name
      * type
      * owner_id
      * is_closed
      * 
    - Participants
      * id
      * participant_id
      * is_admin
      * is_muted
      * ban_meta
      * channel_id

    - Messages
      * channel_id
      * user_id
      * message

    - Blocked_users
      * id
      * blocked_by_id
      * blocked_user_id
  
  POST:
    - Channels
    - Participants
    - Messages
    - Blocked_users

  PATCH:
    - Channels
    - Participants

  DELETE:
    - Blocked_users
    - Participants

  */

import { defineComponent } from "@vue/runtime-core";
import ChatFriendsList from "../components/ChatFriendsList.vue";
import SmallButton from "../components/SmallButton.vue";
import PublicChatChannels from "../components/PublicChatChannels.vue";
import MyChatChannels from "../components/MyChatChannels.vue";
import { loginStatusStore } from "../stores/profileData";
import ChatBox from '../components/ChatBox.vue'
import ChannelOverview from "../components/ChannelOverview.vue";

import ChatHandler from '../components/ChatHandler.vue';

export default defineComponent({
	name: 'ChatView',
	data() {
		return {
			loginStatusStore: loginStatusStore(),
			text: '',
			user: null,
			currentChannel: 0,
			chatHandler: undefined as unknown as typeof ChatHandler,
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
		},
		async test() {
			let success = await this.chatHandler.send_message(1, "Hello, this is a test message!");
			if (success) {
				console.log("Message sent!");
			} else {
				console.log("Message failed to be sent!");
			}
		},

		onMessage(channel_id: number, user: number, message: string) {
			console.log(`Received message in channel: ${channel_id} from ${user}: ${message}`)
		},
		onJoin(channel_id: number) {
			// Add this to an array to pass to your channels
			console.log(`I am in channel ${channel_id}`)
		},
		onLeave(channel_id: number) {
			console.log(`I am no longer in channel ${channel_id}`)
		},
		joinChannel(channel_id: number) {
			this.chatHandler.join_channel(channel_id)
		},
		leaveChannel(channel_id: number) {
			this.chatHandler.leave_channel(channel_id)
		}
	},
	async mounted() {
		this.chatHandler = (this.$refs.ChatHandler as typeof ChatHandler);

		(window as any).chatHandler = this.chatHandler;
	},
	components: {
		ChatFriendsList,
		PublicChatChannels,
		MyChatChannels,
		ChatBox,
		ChannelOverview,
		SmallButton,
		ChatHandler
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

