<template lang="pug">
  transition(enter-active-class="animated fadeInUp")
    router-link(:class="$style.Cog" :to="{ path: cog.links.self }" append)
      div(:class="$style.name") {{ cog.name }}
      div(:class="$style.description") {{ short }}
      div(:class="$style.tags")
        div(:class="$style.tag" v-for="tag in cog.tags.slice(0,3)") \#{{ tag }}
      div(:class="$style.info")
        div(:class="$style.author") {{ cog.author.username }}
        Badge(:class="$style.type" :type="cog.repo.type")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Badge from '@/components/singles/Badge';

@Component({
  components: {
    Badge,
  },
  props: {
    cog: {
      type: Object,
      default: () => ({
        name: 'cog',
        repo: {
          type: 'approved',
          name: 'repo',
        },
        short: '',
        description: '',
        tags: [],
        author: {
          name: 'Author',
          username: 'Author_gh',
        },
        links: {
          self: '/',
        },
      }),
    },
  },
})
export default class Cog extends Vue {
  get short() {
    if (this.cog.short.length < 0) return '';
    if (this.cog.short.length > 75) {
      return `${this.cog.short.split().slice(0, 75).join('')}...`;
    }
    return this.cog.short;
  }
}
</script>

<style lang="sass" module>
$black: #000
$light: rgba($black, .6)
$blueish: rgba(34,37,42,1)

.Cog
  color: $black
  display: flex
  flex-direction: column
  padding: 10px
  border: 1px solid rgba($blueish, 0)
  transition: border 150ms ease
  text-decoration: none

  &:hover
    border: 1px solid rgba($blueish, .6)

.name
  font-weight: bold

.description
  color: $light
  font-size: 14px

.tags
  display: flex
  margin: 10px 0 0 0
  justify-content: space-between
  min-height: 16px

.tag
  font-size: 12px
  color: $light

.info
  display: flex
  justify-content: space-between
  margin: 5px 0 0 0
  color: $light

.author
  font-size: 14px

.type
  align-self: center
</style>

<style>
.fadeInUp {
  animation-duration: 300ms;
}
</style>
