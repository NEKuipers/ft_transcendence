<template>
	<button @click="onClick()" class="button" >{{text}}</button>
</template>

<script>
export default {
	name: 'LargeButton',
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

<style>
.button{
	background-color: rgb(16, 25, 70);
	color:#fff;
	padding: 10px 15px;
	border:none;
	margin:20px;
	font-size: 42px;
}

.button:hover{
	background: #42b983;
	color:#fff;
}
</style>