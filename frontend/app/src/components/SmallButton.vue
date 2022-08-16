<template>
	<button @click="onClick()"  class="small-button">{{text}}</button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
	name: 'SmallButton',
	props: {
		text: String,
		color: String
	},
	methods: {
		onClick() {
			this.$emit('btn-click')
		}
	}
})
</script>

<style>
.small-button {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin-top: 0px;
}

.small-button:hover{
	background: #42b983;
	color:#fff;
	cursor: pointer;
}


</style>