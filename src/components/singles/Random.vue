<template lang="pug">
  div(:class="$style.Random")
    router-link(:class="$style.link" :to="{ path: data.links.self }" append)
      div(:class="$style.random_inner")
        div(:class="$style.random_block")
          div(:class="$style.random_name") {{ data.name }}
          div(:class="$style.random_short") {{ data.short }}
        div(:class="$style.random_block")
          div(:class="$style.random_author")
            div(:class="$style.random_icon")
              FontAwesomeIcon(:icon="authorIcon")
            div {{ data.author.username }}
          div(:class="$style.random_tags" v-if="data.tags.length > 0")
            div(:class="$style.random_icon")
              FontAwesomeIcon(:icon="tagsIcon")
            div {{ data.tags.slice(0,3).join(', ') }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTags from '@fortawesome/fontawesome-pro-light/faTags';
import faUser from '@fortawesome/fontawesome-pro-light/faUser';

@Component({
  components: {
    FontAwesomeIcon,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        author: '',
        tags: [],
      }),
    },
  },
})
export default class Random extends Vue {
  tagsIcon = faTags;
  authorIcon = faUser;
}
</script>

<style lang="sass" module>
.link
  color: #fcfcfc
  text-decoration: none

.Random
  height: 100%

.random_inner
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between

.random_block
  display: flex
  flex-direction: column

.random_name
  font-weight: 600
  font-size: 18pt

.random_short
  font-size: 10pt

.random_author
  font-size: 10pt
  display: flex

.random_tags
  font-size: 10pt
  display: flex
  margin: 5px 0 0 0

.random_icon
  color: rgba(#fff, .6)
  align-self: center
  margin: 0 3px 0 0
  width: 20px
</style>
