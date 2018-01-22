<template lang="pug">
  div(:class="$style.Statsbar")
    div(:class="$style.Statsbar_inner")
      div(:class="$style.number_block")
        div(:class="$style.title") Total Cogs
        div(:class="$style.number_content") {{ cogs.length }}
      div(:class="[$style.number_block, $style.bottom_left]")
        div(:class="$style.title") Total Repos
        div(:class="$style.number_content") {{ repos.length }}
      div(:class="[$style.box_block, $style.double_height]")
        div(:class="$style.title") Random Repo
        div(:class="$style.box_block_content")
          RandomBlock(:data="randomRepo")
      div(:class="[$style.box_block, $style.double_height]")
        div(:class="$style.title") Random Cog
        div(:class="$style.box_block_content")
          RandomBlock(:data="randomCog")
      div(:class="[$style.box_block, $style.double_height]")
        div(:class="$style.title") Popular Tags
        ul(:class="$style.box_block_list")
          li(
            :class="$style.list_item"
            v-if="tags.length > 0"
            v-for="tag in tags.slice(0, 5)"
          ) {{ tag.name }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import random from 'lodash/random';
import RandomBlock from '@/components/singles/Random';

@Component({
  components: {
    RandomBlock,
  },
  computed: mapState(['cogs', 'repos', 'tags']),
  methods: {
    ...mapActions(['fetchTags']),
  },
})
export default class Statsbar extends Vue {
  get randomRepo() {
    return this.repos[random(0, this.repos.length - 1)];
  }

  get randomCog() {
    return this.cogs[random(0, this.cogs.length - 1)];
  }

  async created() {
    if (this.tags.length === 0) {
      await this.fetchTags();
    }
  }
}
</script>

<style lang="sass" module>
$blueish: rgba(34,37,42,1)
$white: #fcfcfc
$mobile: 767px
$desktop: 768px

.Statsbar
  background: $blueish
  padding: 20px 0
  width: 100%
  display: flex
  justify-content: center

.Statsbar_inner
  width: 100%
  max-width: 1000px
  display: grid
  grid-template-columns: .5fr repeat(3, 1fr)
  grid-template-rows: repeat(2, 100px)
  @media (max-width: $mobile)
    grid-template-columns: 1fr 1fr
    grid-template-rows: 100px repeat(3, 210px)
  grid-gap: 10px 20px
  padding: 0 20px

.title
  color: $white
  text-transform: uppercase
  font-size: 18px

.bottom_left
  grid-column-start: 1
  grid-row-start: 2
  @media (max-width: $mobile)
    grid-column-start: 2
    grid-row-start: 1

.double_height
  @media (max-width: $mobile)
    grid-column-end: span 2
  @media (min-width: $desktop)
    grid-row-start: 1
    grid-row-end: span 2
  
.number_block
  color: $white
  display: flex
  flex-direction: column

.number_content
  text-transform: uppercase
  font-size: 50px
  font-weight: 100

.box_block
  color: $white
  display: grid
  grid-template-rows: 25px 1fr

.box_block_content
  border: 1px solid rgba($white, .3)
  padding: 10px
  margin: 10px 0 0 0
  transition: border 150ms ease

  &:hover
    border: 1px solid rgba($white, 1)

.box_block_list
  list-style: none
  margin: 10px 0 0 0
  padding: 0
  display: grid
  align-content: space-between
  grid-template-rows: repeat(5, 1fr)
  grid-row-gap: 5px

.list_item
  border: 1px solid rgba($white, .3)
  padding: 5px 10px
  transition: border 150ms ease
  font-size: 10pt

  &:hover
    border: 1px solid rgba($white, 1)
</style>
