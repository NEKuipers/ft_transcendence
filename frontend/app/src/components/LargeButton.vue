<template>
	<button @click="onClick()" class="large-button" >{{text}}</button>
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
.large-button{
	background-color: rgb(16, 25, 70);
	color:#fff;
	border:none;
	font-size: 26px;
	border-radius: 16px;
	padding:5px;

}

.large-button:hover{
	background: #42b983;
	color:#fff;
	cursor: pointer;
}

</style>