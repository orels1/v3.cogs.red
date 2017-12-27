<template lang="pug">
  div(:class="$style.CogPage")
    Cogbar
    div(:class="$style.CogPage_inner")
      Infobar(type="danger" title="Use at your own risk!") This is a cog from unapproved repository...
      CogTitle Description
      p(:class="$style.text").
        Cog for interaction with Cogs.Red#[br]#[br]
        Commands:#[br]
        [p]redportal search #{'<search_term>'} - searches through cogs listed on cogs.red (alias - redp)
      CogTitle Installation
      p(:class="$style.text").
        Replace [p] with your bot's prefix and use these commands
      CogTitle Readme
      p(:class="$style.text").
        This is the cog to interact with Cogs.Red
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Cogbar from '@/components/singles/Cogbar';

@Component({
  components: {
    Infobar,
    CogTitle: Title,
    Cogbar,
  },
})
export default class CogPage extends Vue {

}
</script>

<style lang="sass" module>
$darkish: rgba(#000, .7)

.CogPage
  color: #000

.CogPage_inner
  max-width: 1200px
  padding: 0 20px
  margin: 0 auto

.text
  color: $darkish
</style>

