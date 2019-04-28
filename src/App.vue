<template lang="pug">
  #app
    .main
      Navbar
      router-view
    Footer
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

@Component({
  components: {
    Navbar,
    Footer,
  },
})
export default class App extends Vue { }
</script>

<style scoped>
#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


<style>
@import url("https://fonts.googleapis.com/css?family=Lato:300,400,700,900");

body {
  margin: 0;
  scroll-behavior: smooth;
}

:root {
  --black: #000;
  --lblack: rgba(0, 0, 0, 0.6);
  --white: #fcfcfc;
  --dwhite: rgba(255, 255, 255, 0.6);
  --blueish: rgba(34, 37, 42, 1);
  --lred: #d5413e;
  --red: #e74c3c;
  --bred: rgb(236, 0, 26);
  --grey: rgb(114, 114, 114);
  --dgrey: #43464b;
  --green: #25a85c;
  --yellow: rgb(253, 185, 141);

  --warn: var(--yellow);
  --success: var(--green);
  --error: var(--red);
  --danger: var(--red);

  --tiny: 440px;
  --mobile: 767px;
  --desktop: 768px;
}
</style>