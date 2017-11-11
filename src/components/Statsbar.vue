<template lang="pug">
  div(:class="$style.Statsbar")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Statsbar extends Vue {

}
</script>

<style lang="sass" module>
$blueish: rgba(34,37,42,1)

.Statsbar
  background: $blueish
  padding: 20px 0
  width: 100%
</style>
