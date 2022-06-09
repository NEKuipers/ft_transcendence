<script>
	import { defineComponent } from 'vue'

	export default defineComponent({
		// type inference enabled
		props: {
			name: String,
			msg: { type: String, required: true }
		},
		data() {
			return {
				count: 1
			}
		},
		mounted() {
			this.name // type: string | undefined
			this.msg // type: string
			this.count // type: number

			this.count = "5"
		}
	})
</script>


<template>
  <h2>Child {{name}} {{msg}} {{count}}</h2>
</template>