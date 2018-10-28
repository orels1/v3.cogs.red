<template lang="pug">
  .PageHeader
    .PageHeader_inner
      .content
        slot
    
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class PageHeader extends Vue {

}
</script>

<style lang="sass" scoped>
$blueish: rgba(34,37,42,1)
$white: #fcfcfc
$mobile: 767px
$desktop: 768px

.PageHeader
  background: $blueish
  padding: 20px 0
  width: 100%
  display: flex
  justify-content: center
  min-height: 100px
  display: flex
  align-items: center

.PageHeader_inner
  width: 100%
  max-width: 1000px
  display: flex
  align-items: center
  padding: 0 20px

.content
  color: $white
  font-size: 2.5em
  text-transform: uppercase
  margin: 30px 0 20px 0
  font-weight: bold
</style>