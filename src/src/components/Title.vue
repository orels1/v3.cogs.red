<template lang="pug">
  div(:class="$style.Title")
    slot
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Title extends Vue {
}
</script>

<style lang="sass" module>
.Title
  color: #000
  font-size: 24px
  text-transform: uppercase
  margin: 30px 0 20px 0
  font-weight: bold
</style>
