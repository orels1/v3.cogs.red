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
import Footer from '@/components/singles/Footer';

@Component({
  components: {
    Navbar,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass" modules>
body
  margin: 0

#app
  font-family: 'Lato', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  min-height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
</style>

<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
</style>