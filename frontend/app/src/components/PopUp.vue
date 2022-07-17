<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window">
                <slot></slot>
            </div>
        </div>
    </transition>
    <!-- <div class="dialog">
        <div class="center">
            <p> Change Username </p>
            <button @click="closeDialog()" class="btn">Confirm New Username</button>
        </div>
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { closeDialog } from 'vue3-promise-dialog'

export default defineComponent({
    name: 'PopUp',

    data: () => ({
        isVisible: false
    }),
    methods: {
        open() {
            this.isVisible = true
        },
        close() {
            this.isVisible = false
        }
    }
})

</script>

<style scoped>
/* .dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}

.btn {
  margin: 10px;
} */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}

</style>

