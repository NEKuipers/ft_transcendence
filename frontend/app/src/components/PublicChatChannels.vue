<template>
	<div class ="publicchatchannels">
		<div id="title">
			<h5>Public Channels</h5>
		</div>
		<div v-if="!publicChatChannels">
			<h5>Channels failed to load</h5>
		</div>
		<div id="channels" v-else-if="publicChatChannels?.length">
			<ul class="listed-channel" v-for="channel in publicChatChannels" :key="channel.id">
				<h5 class="name">{{channel.name}}</h5>
				<SmallButton class="button" text="join" @click="this.$emit('joinChannel',channel.id)"/>
			</ul>
		</div>
		<div v-else>
			<h5>No public channels available</h5>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmallButton from './SmallButton.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
    name: "PublicChatChannels",
    props: {
		user: Object
    },
    data() {
        return {
			loginStatusStore: loginStatusStore(),
            publicChatChannels: null as null | Array<any>,
        };
    },
	mounted() { 
		fetch("/api/channels/public")
			.then(res => res.json())
			.then(data => this.publicChatChannels = data)
			.catch(err => {
			this.publicChatChannels = null;
			console.log(err);
		});
		
	},
    components: { 
		SmallButton 
	},
	methods: {

	},
	emits: ['joinChannel']
})

</script>

<style scoped>
.publicchatchannels {
	display: flex;
	flex-direction: column;
	/* flex-wrap: wrap; */
	/* margin-left: 30px; */
	overflow: auto;
	align-items: flex-start;
	
}

.listed-channel{
	display: flex;
	/* border-style: solid; */
	font-size:large;
	/* border-width: 1px; */
	/* justify-items: space-between; */
	box-sizing: border-box;
	align-items: flex-start;
	/* border-color: red; */
	/* flex-direction: column; */
	/* display: inline-block; */
}

.button {
	float: left;
	margin-left:8px;
}
.name {
	margin-top: -4px;
	float: left;
}

#title {
	margin-left: 20px;
}

#channels {
	max-height: 300px;
}
</style>
