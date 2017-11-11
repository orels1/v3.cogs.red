<template lang="pug">
  div(:class="$style.Home")
    statsbar
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Statsbar from '@/components/Statsbar';

@Component({
  components: {
    statsbar: Statsbar,
  },
})
export default class Home extends Vue {

}
</script>

<style lang="sass" module>
.Home
  color: #000
</style>
