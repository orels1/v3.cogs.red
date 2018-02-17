<template lang="pug">
  div(:class="[$style.Loader, big && $style.big]")
    FontAwesomeIcon(
      :class="[$style.icon, inverted && $style.inverted]"
      spin
      :icon="spinnerIcon"
    )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSpinner from '@fortawesome/fontawesome-pro-light/faSpinnerThird';

@Component({
  components: {
    FontAwesomeIcon,
  },
  props: {
    inverted: Boolean,
    big: Boolean,
  },
})
export default class Loader extends Vue {
  spinnerIcon = faSpinner;
}
</script>

<style lang="sass" module>
$darkish: rgba(#000, .7)
$inverted: #fcfcfc

.Loader
  font-size: 5em
  margin: 40px auto

.big
  margin: 50px auto

.icon
  color: $darkish
  margin: auto
  display: block

.inverted
  color: $inverted
</style>

