<template>
	<div id="page">
		<div>
			<h1>First login eh?</h1>
			<h2>Customise your username and avatar and then click done to enter pong</h2>
		</div>
		<div id="profile">
			<img class="profilePicture" v-bind:src="'/api/avatars/' + avatar_id">
			<h3> {{ profile?.username }} </h3>
		</div>
		<div class="container">
			<form @submit="onSubmit">
				<input type="text" v-model="text" name="text" placeholder="username" />
				<input type="submit" value="Save Username" />
			</form>
		</div>
		<div class="container">
			<form @submit.prevent="onUpload">
				<label for="file">Select a Profile Picture to upload</label>
				<input type="file" ref="file" @change="onFileSelected">
				<button>Upload</button>
			</form>
		</div>
		<div>
			<button class="button" id="done" @click="Done">
				DONE
			</button>
		</div>
	</div>
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { loginStatusStore } from "../stores/profileData"

export default defineComponent({
	name: 'SetupAccountView',
	data() {
		return {
			profile: null as null | any,
			loginStatusStore: loginStatusStore(),
			avatar_id: 1,
			user_id: 0,
			text: "",
			selectedFile: null
		}
	},
	async mounted() {
		let loggedInStatus = await loginStatusStore().logIn()
		if (loggedInStatus) {
			this.user_id = loggedInStatus.userID
			await this.loadprofile(loggedInStatus.userID) 
		} else {
			console.log("Fucked up in SetupAccount")
		}
	},
	methods: {
		async loadprofile(id: number) {
			fetch('/api/profile/' + id)
				.then(res => res.json())
				.then(data => { this.profile = data[0]; this.avatar_id = this.profile.avatar_id})
				.catch(err => console.log('Error in getting profile data', err))
		},
		async onSubmit(e: any) {
            e.preventDefault()
            if (!this.text)
                alert('Must fill in name')
            else {
				await fetch('/api/users/' + this.user_id, {
					method: "PATCH",
					body: JSON.stringify({"username": this.text,}),
					headers: {'Content-type': 'application/json; charset=UTF-8'}})
					.then(res => res.text())
					.then(data => {
						if (data === 'taken'){
							alert('That username is already taken.')
						} else if (data === 'too-long') {
							alert('That username is too long.')
						}
					})
					.catch(err => console.log(err));
				this.loadprofile(this.user_id)
				this.text = ""
            }
        },
		onFileSelected(event: any) {
            // this.selectedFile = this.$refs.avatar.files[0]
            this.selectedFile = event.target.files[0]
        },
		async onUpload() {
            if (!this.selectedFile)
                alert('Ye have tae load a file, son')
            else {
                
                const formData = new FormData()
                formData.append('file', this.selectedFile)
                const newAvatarId = await fetch('/api/avatars', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(res => { return res.json() })
                .catch(err => { console.log(err); return err })

                // If successful, then emit that userProfile has to patch avatar_id for user
                await fetch('/api/users/avatar/' + this.user_id, {
					method: "PATCH",
					body: JSON.stringify({
						"avatar_id": newAvatarId.avatar_id
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
				.catch(err => console.log(err))
				await this.loadprofile(this.user_id)
            }
        },
		Done() {
			console.log("Do this")
			window.location.href = "/"
		}
	}
})
</script>

<style scoped>

.container {
	display: flex;
	justify-items: center;
	flex-direction:column;
	margin: 40px;
	/* border: solid 2px;
	border-radius: 5px; */
}

.profilePicture {
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 20%;
	height: 200px;
	width: 200px;
	border: solid;
	border-width: 3px;
}

#done {
  background-color: #2c3e50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
}

#done:hover {
	background-color: white;
	color: #2c3e50;
	border: solid #2c3e50 1px;
}

</style>