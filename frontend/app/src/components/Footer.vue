<template>
	<div class="footer">
		<p>Copyright &copy; 2022 Nick Kuipers footer at the bottom of the website</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		
	},
	name: 'Footer',
});
</script>

<style scoped>
.footer {
	position: fixed;
	width: 100%;
	text-align: center;
	overflow: hidden;
}
</style>