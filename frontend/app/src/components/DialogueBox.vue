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
            <input type="text" v-model="text" name="text" placeholder="my channel" />
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
            selectedFile: null
        }
    },
    methods: {
        onSubmit(e: any) {
            e.preventDefault()
            if (!this.text)
                alert('Give us a name')
            else {
                this.$emit('new-name', this.text)
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
    width: 30%;
    border: 3px solid #f1f1f1;
    z-index: 9;
    background-color: rgb(8, 8, 97);
    position:fixed;
    top:50%;
    left:50%;
    color: white;
	height: 250px;
}

.close {
    color: red;
    /* margin-left: 270px;
    margin-top: 5px; */
}


</style>
