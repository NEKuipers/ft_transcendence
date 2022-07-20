<template>
    <div v-show="show" class="popup">
        <form @submit="onSubmit">
        <h2> My brethren, what new username would you like? </h2>
        <input type="text" v-model="text" name="text" placeholder="Saul Goodman" />
        <br>
        <input type="submit" value="Save Change" />
        <button @click="onClick" type="button" class="close"> X </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: 'DialogueBox',
    props: ['show'],
    data() {
        return {
            text: ''
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
        }

    },
    emits: ['close-dialogue', 'new-name']
})

</script>


<style scoped>

.popup {
    transform: translate(-50%, -50%);
    width: 50%;
    border: 3px solid #f1f1f1;
    z-index: 9;
    background-color: rgb(8, 8, 97);
    position:fixed;
    top:50%;
    left:50%;
    color: white;

}

.close {
    color: red;
    /* margin-left: 50px; */
}
</style>
