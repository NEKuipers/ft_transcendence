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
            <h2>Upload a new Profile Picture</h2>
            <input type="file" @change="onFileSelected">
            <button @click="onUpload">Upload</button>
            <button @click="onClick" type="button" class="close"> X </button>
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
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            if (!this.selectedFile)
                alert('Ye have tae load a file, son')
            else {
                // console.log('Good job for now', this.selectedFile)
                this.$emit('new-avatar', this.selectedFile)
                // Here we post the file to the backend (Check with Jesse) TODO
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
	height: 200px;

}

.close {
    color: red;
    /* margin-left: 270px;
    margin-top: 5px; */
}
</style>
