<template>
    <div v-if="channel!=null" class="column">
		<div class="passwordbuttons" v-if="userIsOwner">
				<SmallButton class="passwordButton" id="setpw" text="Set new password" @click="enterNewPassword()"/>
				<DialogueBox id="createChannelDialogueBox" :type="boxType" :show="showPasswordDialogue" @close-dialogue="hidePasswordDialogue" @new-name="setPassword"/>
			<div v-if="channel.type == 'protected'">
				<SmallButton class="passwordButton" id="removepw" text="Remove password" @click="removePassword()"/>
			</div>
		</div>
		<div class="listed-participant" v-for="participant in channelParticipants" :key="participant">
			<div id="participantdiv">
				<div id="nameAndRoles">
					<a class="participantName" v-bind:href="'/profile/' + participant.participant_id">{{participant.participant_username}}</a>
					<div class="roles">
						<div class="role" v-if="participant.participant_id === participant.channel_owner_id">
							<p>Owner</p>
						</div>
						<div class="role" v-else-if="participant.participant_is_admin == true">
							<p>Admin</p>
						</div>
						<div class="role" v-if="participant?.participant_is_banned == true">
							<p>(banned)</p>
						</div>
						<div  class="role" v-if="participant?.participant_muted_until > new Date(Date.now()).toISOString()">
							<p>(muted)</p>
						</div>
					</div>
				</div>
				<div v-if="participant?.participant_id != loginStatusStore.loggedInStatus?.userID"> 
				
					<SmallButton v-if="!hasUserBlockedYou(participant?.participant_id)" class="button" text="Invite to Game" @click="gameInvite(participant?.participant_username)"/>
					<DialogueBox id="selectGameModeDialogueBox" :type="boxType" :show="showSelectGameModeDialogue" @game-mode-selected="gameModeSelected" @close-dialogue="hideGameModeDialogue"/>
					
					<div v-if="participant.participant_id != owner_id">
					<!-- banning/muting, with restriction for admin/owner only -->
					<div v-if="userIsAdmin || userIsOwner">
						<SmallButton v-if="!participant?.participant_is_banned" class="button" text="Ban this user" @click="banUser(participant.participant_id)"/>

						<SmallButton v-else class="button" text="Unban this user" @click="unbanUser(participant.participant_id)"/>
						<SmallButton v-if="!participant.participant_muted_until || participant.participant_muted_until < new Date(Date.now()).toISOString() " class="button" text="Mute this user" @click="muteUser(participant.participant_id)"/>
						<SmallButton v-else class="button" text="Unmute this user" @click="unmuteUser(participant.participant_id)"/>
					</div>

					<!-- admin rights -->
					<div v-if="userIsOwner">
						<SmallButton v-if="!participant.participant_is_admin && userIsOwner" class="button" text="Give admin rights" @click="makeUserAdmin(participant.participant_id)"/>
						<SmallButton v-else class="button" text="Take admin rights" @click="removeUserAdmin(participant.participant_id)"/>
					</div>
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
import { isArray } from '@vue/shared'
import { Participant } from '../types/ParticipantType'

export default defineComponent({
    name: 'ChannelOverview',
	components: {
		SmallButton,
		DialogueBox,
	},
    props: {
        channel_id: {
            type: Number
        },
		owner_id: {
			type: Number
		},
    },
	async created() {
		this.getChannelParticipants();
	},
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null,
			channelParticipants: new Array<Participant>(),
            text: '',
			userIsOwner: false,
			userIsAdmin: false,
			showPasswordDialogue: false,
			boxType: "",
			showSelectGameModeDialogue: false,
			usersWhoHaveBlockedYou: new Array<any>(),
			invited_user: "",
			interval: 0
        }
    },
    watch: {
        channel_id: {
            handler(newValue) {
                if (!newValue) { return; }
				this.getChannelDetails();
				this.getChannelParticipants();
            }
        },
    },
	methods: {
		async getChannelParticipants() { 
		fetch("/api/participants/" + this.channel_id)
			.then(res => res.json())
			.then(data => {

				if (isArray(data)) {
					/* sort users in channel: owner then admin at the top, banned at the bottom */
					data = data.sort((a: Participant, b: Participant) => Number(b.participant_is_admin) - Number(a.participant_is_admin));
					data = data.sort((a: Participant, b: Participant) => Number(a.participant_is_banned) - Number(b.participant_is_banned));
					data = data.sort((a: Participant, b: Participant) => {if (a.channel_owner_id == a.participant_id && b.channel_owner_id != b.participant_id) return -1;})
				}

				this.channelParticipants = data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].participant_id == this.loginStatusStore.loggedInStatus?.userID) {
						if (data[i].participant_is_admin) {
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
		async getChannelDetails() { 
		fetch("/api/channels/" + this.channel_id)
			.then(res => res.json())
				.then(data => { this.channel = data[0]; this.checkIfOwner(data[0].owner_id); })
				.catch(err => console.log('Error retrieving channel', err))
		},
		gameInvite(to_username: string) {
			this.boxType = "selectGameMode";
			this.invited_user = to_username;
			this.showSelectGameModeDialogue = true;
		},
		gameModeSelected(game_mode: string) {
			this.$emit('inviteToGame', this.invited_user, game_mode);
			this.showSelectGameModeDialogue = false;
			this.boxType = "";
		},
		async enterNewPassword() {
			this.boxType = "setPassword";
			this.showPasswordDialogue = true;
		},
		removePassword() {
			this.$emit('removePassword', this.channel_id)
			this.getChannelDetails();
		},
		hidePasswordDialogue() {
			this.showPasswordDialogue = false;
		},
		hideGameModeDialogue() {
			this.showSelectGameModeDialogue = false;
		},
		async setPassword(newPassword: string) {
			this.$emit('setPassword', newPassword, this.channel_id);
			this.hidePasswordDialogue();
		},
		hasUserBlockedYou(sender_id: number): boolean {
			for (let x = 0; x < this.usersWhoHaveBlockedYou.length; x++) {
				if ( this.usersWhoHaveBlockedYou[x] == sender_id) {
					return true;
				}
			}
			return false;
		},
		banUser(participant_id: number) {
			this.$emit('banUser', this.channel_id, participant_id);
			this.getChannelParticipants();
		},
		unbanUser(participant_id: number) {
			this.$emit('unbanUser', this.channel_id, participant_id);
			this.getChannelParticipants();
		},
		muteUser(participant_id: number) {
			this.$emit('muteUser', this.channel_id, participant_id);
			this.getChannelParticipants();
		},
		unmuteUser(participant_id: number) {
			this.$emit('unmuteUser', this.channel_id, participant_id);
			this.getChannelParticipants();
		},
		makeUserAdmin(participant_id: number) {
			this.$emit('makeUserAdmin', this.channel_id, participant_id);
			this.getChannelParticipants();
		},
		removeUserAdmin(participant_id: number) {
			this.$emit('removeUserAdmin', this.channel_id, participant_id);
			this.getChannelParticipants();
		},

	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn();
		if (loggedInStatus) {
			await fetch('/api/blocked_users/all_who_blocked_me/' + loggedInStatus.userID)
			.then(res => res.json())
			.then(data => this.usersWhoHaveBlockedYou = data)
			.catch(err => console.log(err));
		}
		this.interval = setInterval(() => {
			this.getChannelParticipants();
		}, 2000)
	},
	unmounted() {
		clearInterval(this.interval)
	},
	emits: ['banUser', 'unbanUser', 'muteUser', 'unmuteUser', 'makeUserAdmin', 'removeUserAdmin', 'setPassword', 'removePassword', 'inviteToGame']
		
})
</script>

<style scoped>


/* TODO make sure it's scrollable */

.participantName {
	text-decoration: none;
	margin-left: 3px;
}

a:visited {
  color: #2c3e50;
}
a:hover {
	text-decoration: underline;
}
.passwordButton {
	height: 30px;
}

.button {
	float: left;
	margin-left:8px;
	width: 130px;
	margin-top: 2px;
}

.passwordbuttons {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 20px;
	margin-top: 20px;

}

#removepw {
	margin-top: -30px;
}

#setpw {
	margin-top: 11px;
}

.listed-participant {
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
	flex-wrap: wrap;
	font-size: medium;
	font-weight: bold;
	flex-direction: row;
	justify-content: space-between;
	margin: 5px;
	max-width: 620px;
	min-width: 100px;
}

.role {
	width:100px;
	height: 15px;
	margin-bottom:20px;
	/* padding-left:10px; */
	margin-left: 5px;
}

.roles {
	display:flex;
	margin-top:-15px;
	flex-wrap: wrap;
	min-width: 400px;
}

.column {
	width: 100%;
}


</style>
