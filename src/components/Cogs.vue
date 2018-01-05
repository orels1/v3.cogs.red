<template lang="pug">
  div(:class="$style.Cogs")
    Statsbar
    div(:class="$style.Cogs_inner")
      Infobar
        |These repositories are community made. We have no say over what goes into them.
        br
        |The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
      CogsTitle New & Updated Cogs
      div(:class="$style.list")
        Cog(v-for="cog in cogs" :key="cog")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Statsbar from '@/components/Statsbar';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Cog from '@/components/singles/Cog';

@Component({
  components: {
    Statsbar,
    Infobar,
    CogsTitle: Title,
    Cog,
  },
})
export default class Cogs extends Vue {
  cogs = [
    'first', 'second', 'third', 'fourth', 'fith',
  ]
}
</script>

<style lang="sass" module>
$mobile: 767px
$tiny: 440px

.Cogs
  color: #000

.Cogs_inner
  display: flex
  flex-direction: column
  max-width: 1000px
  margin: 0 auto
  padding: 0 20px

.list
  display: grid
  grid-template: 130px / repeat(3, 1fr)
  @media (max-width: $mobile)
    grid-template: 130px / repeat(2, 1fr)
  @media (max-width: $tiny)
    grid-template: 130px / repeat(1, 1fr)
  grid-gap: 10px 20px
</style>
