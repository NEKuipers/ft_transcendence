<template>
	<div class ="mychatchannels">
		<h3>Your Channels</h3>
		<div v-if="!myChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div v-else-if="myChatChannels?.length">
			<div v-for="channel in myChatChannels" :key="channel.id">
				<section class="listed-channel">
					<h5>{{channel.name}}</h5>
					<SmallButton text="open"/>
					<SmallButton text="leave"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h5>You are not in any channels yet</h5>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'

export default defineComponent({
    name: "MyChatChannels",
    props: {
        user: {
            type: Number
        },
    },
    data() {
        return {
            myChatChannels: null,
        };
    },
	mounted() { 
		fetch("/api/channels/all_for_" + this.user)
			.then(res => res.json())
			.then(data => { this.myChatChannels = data; })
			.catch(err => {
			this.myChatChannels = null;
			console.log(err);
		});
	},
    watch: {
        user: {
            handler(newValue) {
                if (!newValue) {
                    return;
                } 
                fetch("/api/channels/all_for_" + this.user)
                    .then(res => res.json())
                    .then(data => { this.myChatChannels = data; })
                    .catch(err => {
                    this.myChatChannels = null;
                    console.log(err);
                });
            },
            immediate: true
        }
    },
    components: { SmallButton }
})

</script>

<style scoped>
.mychatchannels {
	margin-left: 50px;
}

</style>
