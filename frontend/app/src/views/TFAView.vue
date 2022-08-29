<template>
	<div>
		<div v-if="value">
			<h3>Setup 2FA by logging in</h3>
			<qrcode-vue :value="value" :size="size"></qrcode-vue>
			<br>
		</div>
		<div v-else>
			<h3>2FA setup, please login</h3>
		</div>

		<h3>Enter code</h3>
		<input v-model="code">
		|
		<button @click="login">Login</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue'
import { loginStatusStore } from '../stores/profileData';

export default defineComponent({
	name: 'TFAView',
	components: {
		QrcodeVue
	},
	data() {
		return {
			value: undefined as string | undefined,
			size: 300,
			code: ""
		};
	},
	async mounted() {
		fetch("/api/two-factor-auth/keyuri")
			.then(res => {
				if (res.ok) {
					return res.text();
				} else {
					return "";
				}
			})
			.then(uri => this.value = uri)
			.catch(err => {
				console.log(err);
				this.value = undefined})
	},
	methods: {
		async login() {
			let res = await fetch(`/api/two-factor-auth/login/${this.code}`);

			if (res.ok) {
				console.log("Login success!")

				let loggedInStatus = await loginStatusStore().logIn();
				loggedInStatus.TFAEnabled = true;
				
				this.$router.push('/');
			} else {
				console.error("Login failure!")
				alert("Login failure")
			}
		}
	}
});
</script>