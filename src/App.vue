<template lang="pug">
  #app
    div
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
export default class App extends Vue {
}
</script>

<style lang="sass" modules>
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: space-between
</style>
