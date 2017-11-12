<template lang="pug">
  div(:class="$style.Infobar")
    div(:class="[$style.sidebar, sidebarType]")
    div(:class="$style.content_wrapper")
      div(:class="$style.title") {{ title }}
      div(:class="$style.content")
        slot
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    type: { type: String, default: 'default' },
    title: { type: String, default: 'disclaimer' },
  },
})
export default class Infobar extends Vue {
  get sidebarType() {
    return this.type ? this.$style[this.type] : this.$style.default;
  }
}
</script>

<style lang="sass" module>
$warn: rgb(253,185,141)
$black: #000
$red: #e74c3c

.Infobar
  color: #000
  margin: 20px 0
  display: flex

.sidebar
  min-height: 50px
  width: 10px

.default
  background: $warn

.danger
  background: $red

.title
  font-size: 20px
  text-transform: uppercase

.content_wrapper
  margin: 0 0 0 10px
  display: flex
  flex-direction: column

.content
  font-size: 14px
  margin: 5px 0 0 0
  color: rgba($black,.8)

</style>
