<template lang="pug">
  div(:class="$style.AboutPage")
    AboutTitle About Red
    p Red is an open source project...
    AboutTitle About Cogs
    p Red is an open source project...
    AboutTitle Repositories
    p Red is an open source project...
    Badge(type="approved") Repositories...
    Infobar(type="danger") Despite the above categories...
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Badge from '@/components/singles/Badge';

@Component({
  components: {
    Infobar,
    AboutTitle: Title,
    Badge,
  },
})
export default class AboutPage extends Vue {

}
</script>

<style lang="sass" module>
.AboutPage
  color: #000
  max-width: 1200px
  padding: 0 20px
  margin: 0 auto
</style>

