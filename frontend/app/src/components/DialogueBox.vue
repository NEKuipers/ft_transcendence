<template>
    <div v-show="show" class="popup">
        <div v-if="type === 'namechange'">
            <form @submit="onSubmit">
            <h2> My brethren, what new username would you like? </h2>
            <input type="text" v-model="text" name="text" placeholder="Saul Goodman" />
            <br>
            <input type="submit" value="Save Change" />
            <button @click="onClick" type="button" class="close"> X </button>
            </form>
        </div>
        <div v-else-if="type === 'avatar'">
            <form @submit.prevent="onUpload">
            <label for="file">Upload a new Profile Picture</label>
            <input 
            type="file" 
            ref="file" 
            @change="onFileSelected">
            <button>Upload</button>
            <button @click="onClick" type="button" class="close"> X </button>
            </form>
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
            <form @submit="onSubmit">
            <h4> Enter password </h4>
            <input type="text" v-model="text" name="text" placeholder="password" />
            <br>
			<input type="submit" value="Save Change" />
			<button @click="onClick" type="button" class="close"> X </button>
            </form>
		</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'DialogueBox',
    props: ['show', 'type'],
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
                // console.log('New avatar_id is', newAvatarId.avatar_id)
                this.$emit('new-avatar', newAvatarId.avatar_id)
            }
        }
    },
    emits: ['close-dialogue', 'new-name', 'new-avatar']
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


</style>
