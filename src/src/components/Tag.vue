<template lang="pug">
    router-link(:class="$style.Tag" :to="{ path: '/search/'+tag.name }" append)
      span(:class="$style.name") {{ tag.name }}
      span(:class="$style.count") {{ tag.count }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    tag: {
      type: Object,
      default: () => ({
        name: '',
        count: 0,
      }),
    },
  },
})

export default class Tag extends Vue {

}
</script>

<style lang="sass" module>
  $black: #000
  $light: rgba($black, .6)
  $blueish: rgba(34,37,42,1)

  .Tag 
    color: $black
    display: flex
    justify-content: space-between
    padding: 10px
    border: 1px solid rgba($blueish, .2)
    transition: border 150ms ease
    text-decoration: none

    &:hover
      border-color: rgba($blueish, 1)

  .name 
    font-size: 16px

  .count 
    text-align: center

</style>
