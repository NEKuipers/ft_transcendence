<template>
    <div v-if="channel!=null" class="column">
        <div> 
            <h6>{{channel.name}}</h6>
        </div>
		<div v-for="participant in channelParticipants" :key="participant?.id">
			<section class="listed-participant">
				<p>{{participant.participant_id}}</p> 
				<!-- this should be username, also should have some sort of denotation whether participant is owner/admin/muted -->
			</section>
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

export default defineComponent({
    name: 'ChannelOverview',
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
	}
		
})

</script>

<style scoped>


</style>
