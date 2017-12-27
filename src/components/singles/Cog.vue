<template lang="pug">
  router-link(:class="$style.Cog" :to="{ path: links.self }" append)
    div(:class="$style.name") {{ name }}
    div(:class="$style.description") {{ description }}
    div(:class="$style.tags")
      div(:class="$style.tag" v-for="tag in tags") \#{{ tag }}
    div(:class="$style.info")
      div(:class="$style.author") {{ author }}
      Badge(:class="$style.type" :type="type")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Badge from '@/components/singles/Badge';

@Component({
  components: {
    Badge,
  },
})
export default class Cog extends Vue {
  name = 'language';
  description = 'Language dictionary that works with characters and alphabets'
  tags = [
    'translator', 'language', 'japanese',
  ];
  author = 'Redjumpman';
  type = 'approved';
  links = {
    self: 'orels1/ORELS-Cogs/language',
  };
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


