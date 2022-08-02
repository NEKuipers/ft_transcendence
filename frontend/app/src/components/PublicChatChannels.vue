<template>
	<div class ="publicchatchannels">
		<h3>Public Channels</h3>
		<div v-if="!publicChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div v-else-if="publicChatChannels?.length">
			<div v-for="channel in publicChatChannels" :key="channel.id">
				<section class="listed-channel">
					<h5>{{channel.name}}</h5>
					<SmallButton text="join"/>
				</section>
			</div>
		</div>
		<div v-else>
			<h5>No public channels available</h5>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'

export default defineComponent({
    name: "PublicChatChannels",
    props: {
        user: {
            type: Number
        },
    },
    data() {
        return {
            publicChatChannels: null,
        };
    },
    watch: {
        user: {
            handler(newValue) {
                if (!newValue) {
                    return;
                }
				
                fetch("/api/channels")
                    .then(res => res.json())
                    .then(data => {this.publicChatChannels = data; })
                    .catch(err => {
                    this.publicChatChannels = null;
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
.publicchatchannels {
	margin-left: 50px;
}

</style>
