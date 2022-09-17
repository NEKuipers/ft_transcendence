<template>
    <div v-show="show" class="popup">
        <div v-if="type === 'namechange'">
            <form @submit="onSubmit">
            <h2> My brethren, what new username would you like? </h2>
            <br><br>
            <input type="text" v-model="text" name="text" placeholder="Saul Goodman" />
            <br><br>
            <input type="submit" value="Save Change" />
            <button @click="onClick" type="button" class="close"> X </button>
            </form>
        </div>
        <div v-else-if="type === 'avatar'">
			<div class="selectAvatarDialogue">
				<form @submit.prevent="onUpload">
				<label for="file">Upload a new Profile Picture</label>
				<br><br>
				<input 
				type="file" 
				ref="file" 
				@change="onFileSelected">
				<br><br>
				<button>Upload</button>
				<button @click="onClick" type="button" class="close"> X </button>
				</form>
			</div>
        </div>
		<div v-else-if="type === 'createChannel'">
            <form @submit="onSubmit">
            <h4> Enter channel name </h4>
			<p class="small" >Channel Name</p>
            <input type="text" v-model="text" name="text" placeholder="my channel" />
			<p class="small">Set password (optional)</p>
			<input type="password" v-model="password" name="password" placeholder="abc123" />
            <br>
			<input type="submit" value="Save Change" />
			<button @click="onClick" type="button" class="close"> X </button>
            </form>
		</div>
		<div v-else-if="type === 'setPassword'">
            <form @submit="onSubmit">
            <h4> Enter new password </h4>
            <input type="password" v-model="text" name="text" placeholder="password" />
            <br>
			<input type="submit" value="Save Change" />
			<button @click="onClick" type="button" class="close"> X </button>
            </form>
		</div>
		<div v-else-if="type === 'enterPassword'">
            <form @submit="onPasswordEntered">
            <h4> Enter password for {{channel_name}} </h4>
            <input type="password" v-model="password" name="password" placeholder="password" />
            <br>
			<input type="submit" value="Save Change" />
			<button @click="onClick" type="button" class="close"> X </button>
            </form>
		</div>
		<div v-else-if="type === 'selectGameMode'">
            <h4> Select a game mode </h4>
			<button @click="onGameModeSelected('classic')" class="gamemodebutton" type="button"> Classic </button>
			<button @click="onGameModeSelected('speedup')" class="gamemodebutton" type="button"> Speedup </button>
			<br><br>
			<button @click="onGameModeSelected('rush')" class="gamemodebutton" type="button"> Rush </button>
			<button @click="onGameModeSelected('expert')" class="gamemodebutton" type="button"> Expert </button>
			<button @click="onClick" type="button" class="close"> X </button>
		</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'DialogueBox',
    props: ['show', 'type', 'channel_id', 'channel_name'],
    data() {
        return {
            text: '',
			password: '',
            selectedFile: null
        }
    },
    methods: {
        onSubmit(e: any) {
            e.preventDefault()
            if (!this.text)
                alert('Give us a name')
            else {
				if (!this.password)
					this.$emit('new-name', this.text)
				else
					this.$emit('new-name', this.text, this.password)
				this.text = ""
				this.password = ""
            }
        },
        onClick() {
            this.$emit('close-dialogue')
        },
		onGameModeSelected(game_mode: string) {
			this.$emit('game-mode-selected', game_mode);
		},
        onFileSelected(event: any) {
            this.selectedFile = event.target.files[0]
        },
        async onPasswordEntered(e: any) {
            e.preventDefault()
            if (!this.password)
                alert('Enter a password, numpty')
            else {
                let verified = false;
				await fetch('/api/channels/verify_password_for_' + this.channel_id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({password: this.password})
                })
				.then(res => res.json())
				.then(data => verified = data);
                this.$emit('password-entered', verified, this.password);
                this.password = ""
            }
            this.password = ""
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
                this.$emit('new-avatar', newAvatarId.avatar_id)
            }
        }
    },
    emits: ['close-dialogue', 'new-name', 'new-avatar', 'password-entered', 'game-mode-selected']
})
</script>


<style scoped>
.popup {
    transform: translate(-50%, -50%);
    width: 38%;
    border: 3px solid #f1f1f1;
    z-index: 9;
    background-color: rgb(8, 8, 97);
    position:fixed;
    top:50%;
    left:50%;
    color: white;
	height: 335px;
}

.close {
    color: red;
    /* margin-left: 270px;
    margin-top: 5px; */
}

.small {
	font-size: small;
}

.gamemodebutton {
	font-size: 20pt;
	margin: 10px;
}

.selectAvatarDialogue {
	margin-top: 100px;
}


</style>
