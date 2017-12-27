<template lang="pug">
  div(:class="$style.Cogbar")
    div(:class="$style.Cogbar_inner")
      div(:class="$style.breadcrumbs")
        div(
          v-for="(path, index) in $route.path.split('/').slice(1)"
          :key="path"
          :class="$style.crumb"
        )
          router-link(
            :class="$style.crumb_link"
            :to="'/' + $route.path.split('/').slice(1, index + 2).join('/')"
          ) {{path}}
      div(:class="$style.infoblock")
        div(:class="$style.title") {{$route.params.cog}}
    
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Cogbar extends Vue {
}
</script>

<style lang="sass" module>
$blueish: rgba(34,37,42,1)
$white: #fcfcfc
$mobile: 767px
$desktop: 768px

.Cogbar
  background: $blueish
  padding: 20px 0
  width: 100%
  display: flex
  justify-content: center

.Cogbar_inner
  width: 100%
  max-width: 1200px
  display: grid
  grid-template: 30px 70px / 1fr
  grid-gap: 10px 20px
  padding: 0 20px

.breadcrumbs
  display: flex

.crumb
  color: rgba(#fff, .6)

  &:after
    content: '▶'
    font-size: 6px
    position: relative
    top: -4px
    margin: 0 5px

  &:last-child:after
    display: none

.crumb_link
  font-size: 20px
  line-height: 30px
  color: rgba(#fff, .6)
  text-transform: uppercase
  text-decoration: none
  transition: color 150ms ease

  &:hover
    color: rgba(#fff, 1)

.infoblock
  display: flex

.title
  color: $white
  font-size: 50px
  line-height: 70px
  text-transform: lowercase
  font-weight: 600
</style>
