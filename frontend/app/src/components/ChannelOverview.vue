<template>
    <div v-if="channel!=null" class="column">
		<div v-if="userIsOwner">
				<SmallButton id="passwordButton" text="Set new password" @click="enterNewPassword()"/>
				<!-- <DialogueBox id="createChannelDialogueBox" :type="boxType" :show="showPasswordDialogue" @close-dialogue="hidePasswordDialogue" @new-name="setPassword"/> -->
			<div v-if="channel.type == 'protected'">
				<SmallButton id="passwordButton" text="Remove password" @click="removePassword()"/>
			</div>
		</div>
		<div class="listed-participant" v-for="participant in channelParticipants" :key="participant?.id">
			<div id="participantdiv">
				<div id="nameAndRoles">
					<a class="participantName" v-bind:href="'/profile/' + participant.participant_id">{{participant.participant_username}}</a>
					<div class="role" v-if="participant.participant_id === participant.channel_owner_id">
						<p>Owner</p>
					</div>
					<div class="role" v-else-if="participant.is_admin == true">
						<p>Admin</p>
					</div>
					<!-- TODO these roles below don't seem to work  -->
					<div class="role" v-if="participant?.is_banned == true">
						<p>Banned</p>
					</div>
					<div class="role" v-else-if="participant?.is_muted == true">
						<p>Muted</p>
					</div>
				</div>
				<div v-if="participant?.participant_id != loginStatusStore.loggedInStatus?.userID">
					<SmallButton v-if="!hasUserBlockedYou(participant?.participant_id)" class="button" text="Invite to Game" @click="gameInvite(participant?.id)"/>

					<!-- banning/muting, with restriction for admin/owner only -->
					<div v-if="userIsAdmin || userIsOwner">
						<SmallButton v-if="!participant?.participant_is_banned" class="button" text="Ban this user" @click="this.$emit('banUser', this.channel_id, participant.participant_id)"/>
						<SmallButton v-else class="button" text="Unban this user" @click="this.$emit('unbanUser', this.channel_id, participant.participant_id)"/>
						<SmallButton v-if="!participant?.participant_is_muted" class="button" text="Mute this user" @click="this.$emit('muteUser', this.channel_id, participant.participant_id)"/>
						<SmallButton v-else class="button" text="Unmute this user" @click="this.$emit('unmuteUser', this.channel_id, participant.participant_id)"/>
					</div>

					<!-- admin rights -->
					<div v-if="userIsOwner">
						<SmallButton v-if="!participant.participant_is_admin && userIsOwner" class="button" text="Give admin rights" @click="this.$emit('makeUserAdmin', this.channel_id, participant.participant_id)"/>
						<SmallButton v-else class="button" text="Remove admin rights" @click="this.$emit('removeUserAdmin', this.channel_id, participant.participant_id)"/>
					</div>
				</div>
			</div>
		</div>
    </div>
    <div v-else>
        <h6>
            Channel overview to be displayed here
        </h6>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { loginStatusStore } from '../stores/profileData'
import SmallButton from './SmallButton.vue'
import DialogueBox from './DialogueBox.vue'

export default defineComponent({
    name: 'ChannelOverview',
	components: {
		SmallButton,
		// DialogueBox,
	},
    props: {
        channel_id: {
            type: Number
        }
    },
	async created() {
		this.getChannelParticipants();
	},
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null,
            messages: null, // Retrieve these from channel ID
			channelParticipants: [],
            text: '',
			userIsOwner: false,
			userIsAdmin: false,
			showPasswordDialogue: false,
			boxType: "",
			usersWhoHaveBlockedYou: new Array<any>(),
        }
    },
    watch: {
        channel_id: {
            handler(newValue) {
                if (!newValue) { return; }
                fetch('/api/channels/' + this.channel_id)
                .then(res => res.json())
                .then(data => { this.channel = data[0]; this.checkIfOwner(data[0].owner_id); })
                .catch(err => console.log('Error retrieving channel', err))
                fetch('/api/messages/channel/' + this.channel_id)
                .then(res => res.json())
                .then(data => { /* console.log(data) ;*/ this.messages = data })
                .catch(err => console.log('Error retrieving messages for channel', err))
				this.getChannelParticipants();
            }
        },
    },
	methods: {
		//TODO turning this into a watch would make it more responsive
		async getChannelParticipants() { 
		fetch("/api/participants/" + this.channel_id)
			.then(res => res.json())
			.then(data => {
				this.channelParticipants = data; 
				for (let i = 0; i < data.length; i++) {
					if (data[i] == this.loginStatusStore.loggedInStatus?.userID) {
						if (data[i].is_admin){
							this.userIsAdmin = true;
						}
					}
				}
			})
			.catch(err => console.log(err));
		},
		checkIfOwner(owner_id: number) {
			if (owner_id == this.loginStatusStore.loggedInStatus?.userID)
				this.userIsOwner = true;
		},
		gameInvite(userId: number) {
			console.log("Inviting to game" , userId)
		},
		async enterNewPassword() {
			this.boxType = "setPassword";
			this.showPasswordDialogue = true;
		},
		removePassword() {
			console.log('remove password');
		},
		hidePasswordDialogue() {
			this.showPasswordDialogue = false;
		},
		async setPassword(newPassword: string) {
			this.$emit('setPassword', newPassword);
			this.hidePasswordDialogue();
		},
		hasUserBlockedYou(sender_id: number): boolean {
			for (let x = 0; x < this.usersWhoHaveBlockedYou.length; x++) {
				if ( this.usersWhoHaveBlockedYou[x] == sender_id) {
					return true;
				}
			}
			return false;
		}
	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await fetch('/api/blocked_users/all_who_blocked_me/' + loggedInStatus.userID)
			.then(res => res.json())
			.then(data => this.usersWhoHaveBlockedYou = data)
			.catch(err => console.log(err));
		}
	},
	emits: ['banUser', 'unbanUser', 'muteUser', 'unmuteUser', 'makeUserAdmin', 'removeUserAdmin', 'setPassword']
		
})
</script>

<style scoped>


/* TODO make sure it's scrollable */

.participantName {
	text-decoration: none;
}

a:visited {
  color: #2c3e50;
}
a:hover {
	text-decoration: underline;
}

#passwordButton {
	float:center;
}

.button {
	float: left;
	margin-left:8px;
}

.listedparticipant {
	display: flex;
	flex-direction: column;
}

#participantdiv {
	display: flex;
	flex-direction: column;
}

#blocked-you-notif {
	font-size: 14px;
}

#nameAndRoles {
	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
	font-size: medium;
	font-weight: bold;
	justify-content: space-between;
	margin: 5px;
}

.role {
	border: solid 1px;
	border-radius: 4px;
	color: #2c3e50;
	font-weight: normal;
}

</style>
