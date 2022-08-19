<template>
    <div v-if="channel!=null" class="column">
        <!-- <div> 
            <h6>{{channel.name}}</h6>
        </div> -->
		<div class="listed-participant" v-for="participant in channelParticipants" :key="participant?.id">
			<div>
				<div id="participantdiv">
					<!-- this should be username, also should have some sort of denotation whether participant is owner/admin/muted -->
					<p>{{participant.participant_id}}</p>
					<SmallButton class="button" text="DM" @click="directMessage(participant?.id)"/>
					<SmallButton class="button" text="Invite to Game" @click="gameInvite(participant?.id)"/>
					<SmallButton v-if="!participant.is_banned" class="button" text="Ban this user" @click="banUser(participant?.id)"/>
					<!-- Need to add other buttons depending on whether is admin or owner or banned or muted etc. -->
				</div>
                <div v-if="participant.is_admin === true">
                    <p>Admin</p>
                </div>
                <div v-if="participant.is_banned === true">
                    <p>Banned</p>
                </div>
                <div v-if="participant.is_muted === true">
                    <p>Muted</p>
                </div>
			</div>
		</div>
		<!-- owner tools and admin tools, add after is_owner is added to participants -->
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
    data() {
        return {
            loginStatusStore: loginStatusStore(),
            channel: null,
            messages: null, // Retrieve these from channel ID
			channelParticipants: null,
            text: ''
        }
    },
    watch: {
        channel_id: {
            handler(newValue) {
                if (!newValue) { return; }
                fetch('/api/channels/' + this.channel_id)
                .then(res => res.json())
                .then(data => { this.channel = data[0] })
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
			.then(data => {this.channelParticipants = data; console.log(this.channelParticipants)})
			.catch(err => console.log(err));
		
		},
		directMessage(userId: number) {
			console.log("You want to DM", userId)
		},
		gameInvite(userId: number) {
			console.log("Inviting to game" , userId)
		},
		banUser(userId: number) {
			console.log("Banning user" , userId)
		},
	}
		
})
</script>

<style scoped>

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

</style>
