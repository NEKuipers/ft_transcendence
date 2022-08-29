<template>
	<div>
		<ChatHandler ref="ChatHandler" uri=":4114" server_name="chat server" @serverMessage="onMessage" @join="onJoin" @leave="onLeave" @clearData="clearData"/>

		<div class="container">
			<div class="column" id="left-column">
				<div id="channels">
					<MyChatChannels @open-chat="openChat" @leaveChannel="leaveChannel" @createChannel="createChannel" :user="loginStatusStore.loggedInStatus?.userID" :myChannels="myChannels"/>
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
					<ChatBox :channel_id="currentChannel" :messages="messages[currentChannel]" @sentMsg="sendMsg"/>
				</div>
			</div>
			<div class="column" id="channel-overview">
				Channel overview
				<ChannelOverview :channel_id="currentChannel" @banUser="banUser" @unbanUser="unbanUser" @muteUser="muteUser" @unmuteUser="unmuteUser" @makeUserAdmin="makeUserAdmin" @removeUserAdmin="removeUserAdmin" @setPassword="setPassword"/>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ChatFriendsList from "../components/ChatFriendsList.vue";
import PublicChatChannels from "../components/OtherChatChannels.vue";
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
			messages: new Array<any>(),
			myChannels: new Array<any>(),
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
		async requestPassword(): Promise<string> {
			return new Promise((resolve, reject) => {
				resolve("TODO: Show dialog box requesting a password")
			});
		},

		onMessage(channel_id: number, user: number, message: string) {
			console.log(`Received message in channel: ${channel_id} from ${user}: ${message}`)

			const msgObj = {channel_id, user, message}
			if (!this.messages[channel_id]) {
				this.messages[channel_id] = []
			}
			this.messages[channel_id].push(msgObj)
		},
		onJoin(channel_id: number, channelName: string) {
			// Add this to an array to pass to your channels
			console.log(`I am in channel ${channel_id}: ${channelName}`)
			this.myChannels.push({
				id: channel_id,
				name: channelName,
			})
		},
		onLeave(channel_id: number) {
			console.log(`I am no longer in channel ${channel_id}`)

			this.myChannels = this.myChannels.filter((elem: any) => elem.id != channel_id);
		},
		joinChannel(channel_id: number) {
			this.chatHandler.join_channel(channel_id)
				.catch(async (err: string) => {
					if (err == "NEED_PASSWORD") {
						let pwd = await this.requestPassword();
						await this.chatHandler.join_channel(channel_id, pwd);
					} else {
						console.error(err);	
					}
				})
		},
		leaveChannel(channel_id: number) {
			this.chatHandler.leave_channel(channel_id)
		},
		clearData() {
			console.log(`We have just connected to the chat server, and should clear any data to its initial state`)
		},
		sendMsg(channel_id: number, msg: string) {
			// console.log("Working?", channel_id, msg)
			this.chatHandler.send_message(channel_id, msg)
		},
		createChannel(name: string, newpassword: string | undefined | null) {
			this.chatHandler.create_channel(name, "public")
			console.log('Creating a channel: ', name, ' with apssword:', newpassword)
		},
		banUser(channel_id: number, user_id: number) {
			this.chatHandler.ban_user(channel_id, user_id);
		},
		unbanUser(channel_id: number, user_id: number) {
			this.chatHandler.unban_user(channel_id, user_id);	
		},
		muteUser(channel_id: number, user_id: number) {	
			this.chatHandler.mute_user(channel_id, user_id);
		},
		unmuteUser(channel_id: number, user_id: number) {
			this.chatHandler.unmute_user(channel_id, user_id);	
		},
		makeUserAdmin(channel_id: number, user_id: number) {
			this.chatHandler.make_user_admin(channel_id, user_id);
		},
		removeUserAdmin(channel_id: number, user_id: number) {
			this.chatHandler.remove_user_admin(channel_id, user_id);	
		},
		setPassword(newPassword: string) {
			//TODO implement this - How do we know which chat it is for?
			console.log('Chosen password: ', newPassword);
		}
	},
	async mounted() {
		this.chatHandler = (this.$refs.ChatHandler as typeof ChatHandler);

		// TODO: THIS IS JUST FOR DEBUGGING, REMOVE THIS LATER
		(window as any).chatHandler = this.chatHandler;
	},
	components: {
		ChatFriendsList,
		PublicChatChannels,
		MyChatChannels,
		ChatBox,
		ChannelOverview,
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

