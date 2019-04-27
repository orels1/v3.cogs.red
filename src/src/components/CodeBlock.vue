<template lang="pug">
  div(:class="$style.CodeBlock")
    input(
      :class="$style.input"
      type="text"
      ref="code"
      :value="code"
      readonly
    )
    button(:class="[$style.copy, copyState]" @click="copy")
      FontAwesomeIcon(
        :class="$style.copy_icon"
        :icon="copyIcon"
      )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPaste from '@fortawesome/fontawesome-pro-light/faPaste';

@Component({
  components: {
    FontAwesomeIcon,
  },
  props: {
    code: { type: String, default: '' },
  },
})
export default class Cog extends Vue {
  copyIcon = faPaste;
  copyState = '';

  copy() {
    this.$refs.code.select();
    document.execCommand('copy');
    this.copyState = this.$style.success;

    setTimeout(() => {
      this.copyState = '';
    }, 3000);
  }
}
</script>

<style lang="sass" module>
$black: #000
$white: #fcfcfc
$copy: #666D7A
$copy_active: #434850
$success: #25A85C

.CodeBlock
  background: rgba($black, .9)
  display: flex

.input
  padding: 15px 15px
  background: transparent
  color: $white
  border: none
  flex: 1 0

  &::selection
    background: rgba($white, .2)

.copy
  background: $copy
  padding: 15px 15px
  border: 0
  font-size: 14px
  cursor: pointer
  transition: background 150ms ease

  &:hover
    background: $copy_active

.success
  background: $success !important

.copy_icon
  color: $white

</style>


