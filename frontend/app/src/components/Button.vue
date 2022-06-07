<template>
	<button @click="onClick()" class="btn"> {{text}} </button>
</template>
	
<script lang="ts">

export default {
	name: 'MyButton',
	props: {
		text: String,
		color: String
	},
	methods: {
		onClick() { console.log("Cliccato diobe") }
	}
}
</script>

<!-- <style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style> -->
