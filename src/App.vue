<template lang="pug">
  #app
    navbar
    router-view
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '@/components/Navbar';

@Component({
  components: {
    navbar: Navbar,
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
</style>
