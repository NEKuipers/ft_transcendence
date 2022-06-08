<template>
	<button @click="onClick()" :style="{background: color }" class="btn">{{text}}</button>
</template>

<script>
export default {
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
}
</script>

<style scoped>
.btn {
	font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
}
</style>