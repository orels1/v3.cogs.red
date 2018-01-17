<template lang="pug">
  div(:class="$style.Cogs")
    Statsbar
    div(:class="$style.Cogs_inner")
      Infobar
        |These repositories are community made. We have no say over what goes into them.
        br
        |The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
      CogsTitle New & Updated Cogs
      div(:class="$style.list" v-if="loaded")
        Cog(v-for="cog in cogs.slice(0, 30 * page)" :key="cog" :cog="cog")
      button(
        :class="$style.show_more"
        v-show="showMoreBtn"
        @click="showMore"
      ) Show More
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import Statsbar from '@/components/Statsbar';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Cog from '@/components/singles/Cog';
import 'animate.css';

@Component({
  components: {
    Statsbar,
    Infobar,
    CogsTitle: Title,
    Cog,
  },
  methods: {
    ...mapActions(['fetchCogs']),
  },
  computed: mapState(['cogs']),
})
export default class Cogs extends Vue {
  loaded = false;
  page = 1;

  get showMoreBtn() {
    return this.page * 30 < this.cogs.length;
  }

  showMore() {
    this.page += 1;
  }

  async created() {
    try {
      if (this.cogs.length > 0) {
        this.loaded = true;
        return;
      }
      await this.fetchCogs();
      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style lang="sass" module>
$mobile: 767px
$tiny: 440px
$blueish: rgba(34,37,42,1)
$hover: #43464B
$red: rgb(236,0,26)
$white: #fcfcfc

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

.show_more
  border: 0
  padding: 0 40px
  font-size: 11pt
  font-weight: 400
  text-transform: uppercase
  line-height: 40px
  color: $white
  background: $blueish
  align-self: center
  margin: 15px 0
  border-radius: 0
  cursor: pointer
  transform: scale(1,1)
  transition: color 150ms ease, border-radius 150ms ease-out, transform 150ms ease

  &:hover
    background: $hover
    border-radius: 20px

  &:active
    transform: scale(.9,.9)

</style>
