<template lang="pug">
  div(:class="$style.CogsListPage")
    Statsbar
    div(:class="$style.CogsListPage_inner")
      Infobar
        |These repositories are community made. We have no say over what goes into them.
        br
        |The author of Red and the contributors are not responsible for any damage caused by 3rd party cogs.
      CogsTitle New Cogs
      Loader(v-if="!loaded")
      div(:class="$style.list" v-if="loaded")
        Cog(v-for="cog in latestCogs" :key="cog._id" :cog="cog")
      CogsTitle
        |All Cogs
        FontAwesomeIcon(
          :class="$style.shuffle_icon"
          :icon="shuffleIcon"
          @click="shuffleClick"
          @mouseover="showShuffleTooltip = true"
          @mouseleave="showShuffleTooltip = false"
        )
        div(
          :class="[$style.shuffle_tooltip, showShuffleTooltip && $style.visible]"
        ) Shuffle cogs

      div(:class="$style.list" v-if="loaded")
        Cog(v-for="cog in cogs.slice(0, 30 * page)" :key="cog._id" :cog="cog")
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
import sortBy from 'lodash/sortBy';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faRandom from '@fortawesome/fontawesome-pro-light/faRandom';
import Loader from '@/components/singles/Loader';
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
    Loader,
    FontAwesomeIcon,
  },
  methods: {
    ...mapActions(['fetchCogs', 'fetchRepos', 'shuffleCogs']),
  },
  computed: mapState(['cogs', 'repos']),
})
export default class CogsListPage extends Vue {
  loaded = false;
  page = 1;
  shuffleIcon = faRandom;
  showShuffleTooltip = false;

  get showMoreBtn() {
    return this.page * 30 < this.cogs.length;
  }

  get latestCogs() {
    if (!this.cogs.length) return [];
    return sortBy(this.cogs, 'updated_at')
      .reverse()
      .slice(0, 9);
  }

  shuffleClick() {
    this.shuffleCogs(this.cogs);
  }

  showMore() {
    this.page += 1;
  }

  async created() {
    try {
      if (this.cogs.length > 0 && this.repos.length > 0) {
        this.loaded = true;
        return;
      }

      if (this.cogs.length === 0) {
        await this.fetchCogs();
      }
      if (this.repos.length === 0) {
        await this.fetchRepos();
      }
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

.CogsListPage
  color: #000
  width: 100%

.CogsListPage_inner
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
  outline: none !important
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

.shuffle_icon
  cursor: pointer
  opacity: .3
  margin: 0 0 0 10px
  transition: opacity 150ms ease

  &:hover
    opacity: 1

.shuffle_tooltip
  opacity: 0
  font-weight: 300
  font-size: 1rem
  margin: 0 0 0 10px
  position: relative
  top: -3px
  display: inline-block
  transition: opacity 150ms ease

.visible
  opacity: .4

</style>
