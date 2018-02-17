<template lang="pug">
  div(:class="$style.Databar")
    div(:class="$style.Databar_inner")
      div(:class="$style.header")
        div(:class="$style.breadcrumbs")
          div(
            v-for="(path, index) in $route.path.split('/').slice(1, crumbsDepth[type])"
            :key="path"
            :class="$style.crumb"
          )
            router-link(
              :class="$style.crumb_link"
              :to="'/' + $route.path.split('/').slice(1, index + 2).join('/')"
            ) {{path}}
        Badge(
          v-if="type !== 'user'"
          :class="$style.type"
          :type="type === 'cog' ? source.repo.type : source.type"
        )
      div(:class="$style.infoblock")
        div(:class="$style.title") {{source.name}}
        div(:class="$style.tags" v-if="type !== 'user' && source.tags.length > 0")
          FontAwesomeIcon(
            :class="$style.tags_icon"
            :icon="tagsIcon"
          )
          div(
            :class="$style.tag"
            v-for="tag in source.tags.slice(0, 3)"
            :key="tag"
          )
            router-link(
              :class="$style.tag_link"
              :to="'/tags/' + tag"
            ) {{tag}}
    
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Badge from '@/components/singles/Badge';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTags from '@fortawesome/fontawesome-pro-light/faTags';

@Component({
  components: {
    Badge,
    FontAwesomeIcon,
  },
  props: {
    source: Object,
    type: String,
  },
})
export default class Databar extends Vue {
  tagsIcon = faTags;
  crumbsDepth = {
    cogs: 4,
    repo: 3,
    user: 2,
  }

  get renderTags() {
    return this.type !== 'user' && this.source.tags.length > 0;
  }
}
</script>

<style lang="sass" module>
$blueish: rgba(34,37,42,1)
$white: #fcfcfc
$mobile: 767px
$desktop: 768px

.Databar
  background: $blueish
  padding: 20px 0
  width: 100%
  display: flex
  justify-content: center
  min-height: 110px

.Databar_inner
  width: 100%
  max-width: 1000px
  display: grid
  grid-template: 30px 70px / 1fr
  @media (max-width: $mobile)
    grid-template: 1fr / 1fr
  grid-gap: 10px 20px
  padding: 0 20px

.header
  display: flex
  justify-content: flex-start
  align-items: flex-start
  @media (max-width: $mobile)
    flex-direction: column

.breadcrumbs
  display: flex
  flex-wrap: wrap

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
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  @media (max-width: $mobile)
    flex-direction: column
    justify-content: flex-start
    align-items: flex-start

.title
  color: $white
  font-size: 50px
  line-height: 70px
  text-transform: lowercase
  font-weight: 600

.type
  @media (min-width: $desktop)
    margin-left: 20px
    align-self: center
    position: relative
    top: -1px
  @media (max-width: $mobile)
    margin-top: 10px

.tags
  display: flex

.tags_icon
  color: rgba(#fff, .6)
  align-self: center
  margin: 0 5px 0 0

.tag
  margin: 0 5px

  &:after
    content: ','
    color: rgba(#fff, .6)

  &:last-child:after
    display: none

.tag_link
  color: rgba(#fff, .6)
  text-decoration: none
  transition: color 150ms ease

  &:hover
    color: rgba(#fff, 1)
</style>
