<template>
	<div>
		<ChatHandler ref="ChatHandler" uri=":4114" server_name="chat server" @serverMessage="onMessage" @join="onJoin" @leave="onLeave" @clearData="clearData" @mute_status="muteStatus" @admin_status="adminStatus"/>

		<div class="container">
			<div class="column" id="left-column">
				<div class="channels" id="yourChannels">
					<MyChatChannels @open-chat="openChat" @leaveChannel="leaveChannel" @createChannel="createChannel" :user="loginStatusStore.loggedInStatus?.userID" :channels="channels"/>
				</div>
				<div class="channels">
					<OtherChatChannels v-if="loginStatusStore" :key="leaveChannelKey" @joinChannel="joinChannel" :user="loginStatusStore.loggedInStatus?.userID"/>
					<!-- <dialogueBox id="promptPassword" :type="boxType" 
						:show="showDialogue" @close-dialogue="hideDialogue" 
						@passwordEntered="verifyPassword" /> -->
				</div>
				<div id="friends">
					<ChatFriendsList v-if="loginStatusStore" :user="loginStatusStore.loggedInStatus?.userID" @openDM="openDM"/>
				</div>
			</div>
			<div class="column" id="center_column">
				<div>
					<ChatBox :key="blocksKey" :user="loginStatusStore.loggedInStatus?.userID"
						:channel_id="currentChannel" :dm="dmID" :messages="channels[currentChannel]?.messages" :isMuted="channels[currentChannel]?.muted" @sentMsg="sendMsg"/>
				</div>
			</div>
			<div class="column" id="channel-overview">
				<div v-if="dmID > 0">
					<DMUserCard :user="dmID"></DMUserCard>
				</div>
				<div v-else>
				Channel overview
					<ChannelOverview :key="blocksKey"  :channel_id="currentChannel" :dm="dmID" @banUser="banUser" @unbanUser="unbanUser" @muteUser="muteUser" @unmuteUser="unmuteUser" @makeUserAdmin="makeUserAdmin" @removeUserAdmin="removeUserAdmin" @setPassword="setPassword"/>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ChatFriendsList from "../components/ChatFriendsList.vue";
import OtherChatChannels from "../components/OtherChatChannels.vue";
import MyChatChannels from "../components/MyChatChannels.vue";
import { loginStatusStore } from "../stores/profileData";
import ChatBox from '../components/ChatBox.vue'
import ChannelOverview from "../components/ChannelOverview.vue";

import ChatHandler from '../components/ChatHandler.vue';
import DMUserCard from "../components/DMUserCard.vue";

export default defineComponent({
	name: 'ChatView',
	data() {
		return {
			loginStatusStore: loginStatusStore(),
			text: '',
			currentChannel: 0,
			user: null as any,
			chatHandler: undefined as unknown as typeof ChatHandler,
			channels: {} as {[key: number]: any},
			boxType: "",
			leaveChannelKey: 0,
			blocksKey: 0,
			dmID: -1,
		}
	},
	methods: {
		async loadUserData(id: number) {
			fetch('/api/users/' + id)
				.then(res => res.json())
				.then(data => this.user = data)
				.catch(err => console.log(err));
		},
		openChat(channel_id: number) {
			this.currentChannel = channel_id
			this.dmID = -1;
		},
		async openDM (user_id_1: number, user_id_2: number) {
			this.dmID = user_id_2;

			// Try to find the already existing dm channel
			let expected_name = `dm-${Math.min(user_id_1, user_id_2)}-${Math.max(user_id_1, user_id_2)}`;
			for (let id in this.channels) {
				let data = this.channels[id];

				if (data.type == "direct" && data.name == expected_name) {
					this.currentChannel = data.id;
					return;
				}
			}

			// guess it doesn't exist, create it!
			// Does it matter that dmID is set, and currentChannel is only set after a response was gotten from the chatio server?
			this.currentChannel = await this.chatHandler.create_dm(user_id_2);
		},
		async requestPassword(): Promise<string> {
			return new Promise((resolve, reject) => {
				// How to open dialogue box straight from the function?

				resolve("TODO: Show dialog box requesting a password")
			});
		},

		onMessage(channel_id: number, user: number, message: string) {
			console.log(`Received message in channel: ${channel_id} from ${user}: ${message}`)

			const msgObj = {channel_id, user, message}
			this.channels[channel_id].messages.push(msgObj)
		},
		onJoin(channel_id: number, channelName: string, channelType: string, channelOwner: number) {
			// Add this to an array to pass to your channels
			console.log(`I am in channel ${channel_id} '${channelName}' that is of type '${channelType}' and the owner's usedID is ${channelOwner}`)
			this.channels[channel_id] = {
				id: channel_id,
				name: channelName,
				type: channelType,
				owner: channelOwner,
				messages: new Array<string>()
			}
		},
		onLeave(channel_id: number) {
			console.log(`I am no longer in channel ${channel_id}`)
			this.leaveChannelKey += 1;
			delete this.channels[channel_id];
		},
		joinChannel(channel_id: number, password: string) {
			this.chatHandler.join_channel(channel_id, password == undefined ? undefined : password)
				.catch(async (err: string) => {
					console.log('error is', err)
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
			// TODO: This should be done!
		},
		sendMsg(channel_id: number, msg: string) {
			// console.log("Working?", channel_id, msg)
			this.chatHandler.send_message(channel_id, msg)
		},
		createChannel(name: string, newpassword: string | undefined | null) {
			this.chatHandler.create_channel(name, newpassword)
			console.log('Creating a channel: ', name, ' with password:', newpassword)
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
			//TODO: implement this - How do we know which chat it is for?
			console.log('Chosen password: ', newPassword);
		},

		muteStatus(channel_id: number, isMuted: string) {
			if (isMuted > Date.now().toString()) {
				console.log(`I am muted in channel ${channel_id}`);
			} else {
				console.log(`I am not muted in channel ${channel_id}`);
			}

			this.channels[channel_id].muted = isMuted;
		},
		adminStatus(channel_id: number, isAdmin: boolean) {
			if (isAdmin) {
				console.log(`I am admin in channel ${channel_id}`);
			} else {
				console.log(`I am not admin in channel ${channel_id}`);
			}
			
			this.channels[channel_id].admin = isAdmin;
		},
	},
	async mounted() {
		this.chatHandler = (this.$refs.ChatHandler as typeof ChatHandler);
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await this.loadUserData(loggedInStatus.userID);
		} else {
			console.error("Viewing ChatView while not logged in!")
		}
		// TODO: THIS IS JUST FOR DEBUGGING, REMOVE THIS LATER
		(window as any).chatHandler = this.chatHandler;
		(window as any).chatView = this;
	},
	components: {
		ChatFriendsList,
		OtherChatChannels,
		MyChatChannels,
		ChatBox,
		ChannelOverview,
		ChatHandler,
		DMUserCard
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
	box-sizing: border-box;
	min-height: 1000px;
}

#left-column {
	display: flex;
	gap: 10px;
	width: 20%;
	background-color: white;
}

#center_column {
	width: 65%;
	padding:10px;
	background-color: #f4f4f4;
}

#input-box {
	margin-top: 20px;
	width: 80%;
	height:45px;
	font-size: 20px;
}

#yourChannels {
	border-bottom: 5px solid white;

}

.channels {
	display: flex;
	font-size: 30px;
	height: 50%;
	row-gap: 10px;
	background-color: #f4f4f4;
}

#friends {
	display: flex;
	box-sizing: border-box;
	font-size: 15px;
	background-color: #f4f4f4;
	border-top: 5px solid white;
	border-radius: 5px;
	height: 50%;
	justify-content: left;
	padding-left: 40px;
	/* width: 20%; */
}

#channel-overview {
	padding:10px;

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

