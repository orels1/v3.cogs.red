<template lang="pug">
  div(:class="$style.Footer").
    Want to see v3.cogs.red faster? #[a(:class="$style.link" href="https://github.com/orels1/v3.cogs.red") get involved!]
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {
}
</script>

<style lang="sass" module>
$white: #fcfcfc
$blueish: rgba(34,37,42,1)
$lred: #D5413E

.Footer
  color: $white
  background: $blueish
  font-size: 12px
  text-transform: uppercase
  margin: 40px 0 0 0
  width: 100%
  min-height: 100px
  line-height: 100px
  text-align: center

.link
  color: $lred
  text-decoration: none
</style>
