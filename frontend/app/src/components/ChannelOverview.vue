<template>
    <div v-if="channel!=null" class="column">
        <!-- <div> 
			<h6>{{channel.name}}</h6>
        </div> -->
		<div class="listed-participant" v-for="participant in channelParticipants" :key="participant?.id">
			<div>
				<div id="participantdiv">
					<div id="nameAndRoles">
						<p>{{participant.participant_username}}</p>
						<div class="role" v-if="participant.participant_id === participant.channel_owner_id">
							<p>Owner</p>
						</div>
						<div class="role" v-if="participant.is_admin === true">
						<!-- <div class="role"> -->
							<p>Admin</p>
						</div>
						<!-- <div class="role"> -->
							<div class="role" v-if="participant.is_banned === true">
							<p>Banned</p>
						</div>
						<!-- <div class="role"> -->
							<div class="role" v-if="participant.is_muted === true">
							<p>Muted</p>
						</div>
					</div>
					<div v-if="participant?.participant_id != loginStatusStore.loggedInStatus?.userID">
					<!-- DM is not required here. Should only be accessible from the friends section -->
						<SmallButton class="button" text="Invite to Game" @click="gameInvite(participant?.id)"/>

						<!-- banning/muting, with restriction for admin/owner only -->
						<SmallButton v-if="!participant.is_banned && (userIsAdmin || userIsOwner)" class="button" text="Ban this user" @click="banUser(participant?.id)"/>
						<SmallButton v-if="participant.is_banned && (userIsAdmin || userIsOwner)" class="button" text="Unban this user" @click="unbanUser(participant?.id)"/>

						<SmallButton v-if="!participant.is_muted && (userIsAdmin || userIsOwner)" class="button" text="Mute this user" @click="muteUser(participant?.id)"/>
						<SmallButton v-if="participant.is_muted && (userIsAdmin || userIsOwner)" class="button" text="Unmute this user" @click="unmuteUser(participant?.id)"/>

						<!-- admin rights -->
						<SmallButton v-if="!participant.is_admin && userIsOwner" class="button" text="Give admin rights" @click="makeUserAdmin(participant?.id)"/>
						<SmallButton v-if="participant.is_admin && userIsOwner" class="button" text="Remove admin rights" @click="removeUserAdmin(participant?.id)"/>
					</div>
				</div>
				
				<div v-if="userIsOwner">
					<SmallButton v-if="participant.is_admin && userIsOwner" class="button" text="Set password" @click="setPassword()"/>
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

export default defineComponent({
    name: 'ChannelOverview',
	components: {
		SmallButton
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
		async getChannelParticipants() { 
		fetch("/api/participants/" + this.channel_id)
			.then(res => res.json())
			.then(data => {
				this.channelParticipants = data; 
				console.log(this.channelParticipants);
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
		banUser(userId: number) {
			console.log("Banning user" , userId)
		},
		unbanUser(userId: number) {
			console.log("Unbanning user" , userId)
		},
		muteUser(userId: number) {
			console.log("Muting user" , userId)
		},
		unmuteUser(userId: number) {
			console.log("Unmuting user" , userId)
		},
		makeUserAdmin(userId: number) {
			console.log("Giving admin rights to user" , userId)
		},
		removeUserAdmin(userId: number) {
			console.log("Removing admin rights to user" , userId)
		},
		setPassword() {
			console.log("Set password")
		},
	}
		
})
</script>

<style scoped>


/* TODO make sure it's scrollable */


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
