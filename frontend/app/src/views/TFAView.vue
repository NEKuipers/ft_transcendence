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
	data: function() {
		return {
			value: undefined as string | undefined,
			size: 300,
			code: ""
		};
	},
	mounted: function() {
		fetch(`/api/two-factor-auth/logout`);	// Logout once this screen opens

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
		login() {
			let code = this.code;
			let login = loginStatusStore();
			if (!login.loggedInStatus) {
				return;
			}
			
			//console.log(`using code: ${code}`);

			fetch(`/api/two-factor-auth/login/${code}`)
				.then(res => {
					console.log("res: ", res)
					if (res.ok) {
						console.log("Login success!")
						if (login.loggedInStatus) {
							login.loggedInStatus.TFAEnabled = true;
						}
						this.$router.push('/');
					} else {
						console.log("Login failure!")
						alert("Login failure")
					}
				})
				.catch(err => console.error(err))
		}
	}
});
</script>