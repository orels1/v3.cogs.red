<template lang="pug">
  div(:class="$style.Cogs")
    statsbar
    div(:class="$style.Cogs_inner")
      infobar
        |These repositories are community made. We have no say over what goes into them.
        br
        |The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Statsbar from '@/components/Statsbar';
import Infobar from '@/components/singles/Infobar';

@Component({
  components: {
    statsbar: Statsbar,
    infobar: Infobar,
  },
})
export default class Cogs extends Vue {

}
</script>

<style lang="sass" module>
.Cogs
  color: #000

.Cogs_inner
  display: flex
  flex-direction: column
  max-width: 1200px
  margin: 0 auto
</style>
