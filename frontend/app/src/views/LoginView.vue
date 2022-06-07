<template>
  <div class="login">
    <h1>Login page goes here</h1>
    <header>
      <LoginComponent />
      <!-- <MyButton text="Just push this for vibes" color="red"/> -->
    </header>
  </div>
</template>

<script lang="ts">
import LoginComponent from '../components/LoginComponent.vue'
import MyButton from '../components/Button.vue'

export default {
  name: 'LoginView',
  props: {

  },
  components: {
    LoginComponent,
    // MyButton,
  }
}
</script>

<style>
    .btn {
        display: inline-block;
        background-color: #2c3e50;
        border-radius: 10px;
        border: 4px double #cccccc;
        color: #eeeeee;
        text-align: center;
        font-size: 18px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        padding: 20px;
        width: 200px;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }
</style>
