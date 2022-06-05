<template>
  <div>
    <Header></Header>
    <div class="container">
      <Homepage></Homepage>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Homepage from './views/Homepage.vue';

/*
fetch('http://localhost:3000/test')
  .then(response => response.text())
  .then((body) => {
    console.log(body);
  });
*/

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    Homepage,

  },
});
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #f4f4f4;
  color: #555555;
  
}

.container {
  max-width: 1440px;
  margin-top: 30px;
}

</style>
