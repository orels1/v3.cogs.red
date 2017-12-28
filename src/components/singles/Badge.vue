<template lang="pug">
  div(:class="$style.Badge" :style={ backgroundColor: color }) {{ content }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    color: { type: String, default: '#2ecc71' },
    text: String,
    type: String,
  },
})
export default class Badge extends Vue {
  get content() {
    return this.type ? this.type : this.text;
  }
}
</script>

<style lang="sass" module>
.Badge
  height: 17px
  line-height: 17px
  padding: 0 10px
  font-size: 10px
  color: #fff
  background-color: #25a85c
</style>


