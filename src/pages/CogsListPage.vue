<template lang="pug">
  .CogsListPage
    Statsbar
    .CogsListPage_inner
      Infobar
        |These repositories are community made. We have no say over what goes into them.
        br
        |The author of Red and the contributors are not responsible for any damage caused by
        | 3rd party cogs.
      UnapprovedSwitch
      CogsTitle New Cogs
      Loader(v-if="!loaded")
      .list(v-if="loaded && latestCogs.length")
        Cog(v-for="cog in latestCogs" :key="cog._id" :cog="cog")
      div(v-if="loaded && !latestCogs.length") It's pretty empty here for now...
      CogsTitle
        |All Cogs
        font-awesome-icon.shuffle_icon(
          :icon="['fal', 'random']"
          @click="shuffleClick"
          @mouseover="showShuffleTooltip = true"
          @mouseleave="showShuffleTooltip = false"
        )
        .shuffle_tooltip(
          :class="showShuffleTooltip && 'visible'"
        ) Shuffle cogs

      .list(v-if="loaded && cogs.length")
        Cog(v-for="cog in cogs.slice(0, 30 * page)" :key="cog._id" :cog="cog")
      div(v-if="loaded && !cogs.length") It's pretty empty here for now...
      button.show_more(
        v-show="showMoreBtn"
        @click="showMore"
      ) Show More
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import sortBy from 'lodash/sortBy';
import Loader from '@/components/Loader';
import Statsbar from '@/components/Statsbar';
import Infobar from '@/components/Infobar';
import Title from '@/components/Title';
import Cog from '@/components/Cog';
import UnapprovedSwitch from '@/components/UnapprovedSwitch';
import 'animate.css';

@Component({
  components: {
    Statsbar,
    Infobar,
    CogsTitle: Title,
    Cog,
    Loader,
    UnapprovedSwitch,
  },
  methods: {
    ...mapActions(['fetchCogs', 'fetchRepos', 'shuffleCogs']),
  },
  computed: mapState(['cogs', 'repos']),
})
export default class CogsListPage extends Vue {
  loaded = false;
  page = 1;
  showShuffleTooltip = false;

  get showMoreBtn() {
    return this.page * 30 < this.cogs.length;
  }

  get latestCogs() {
    if (!this.cogs.length) return [];
    return sortBy(this.cogs, ['updated', 'created'])
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

<style scoped>
.CogsListPage {
  color: #000;
  width: 100%;
}

.CogsListPage_inner {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.list {
  display: grid;
  grid-template: 105px / repeat(3, 1fr);
  grid-gap: 10px 20px;
}

.show_more {
  border: 0;
  padding: 0 40px;
  font-size: 11pt;
  font-weight: 400;
  outline: none !important;
  text-transform: uppercase;
  line-height: 40px;
  color: var(--white);
  background: var(--blueish);
  align-self: center;
  margin: 15px 0;
  border-radius: 0;
  cursor: pointer;
  transform: scale(1, 1);
  transition: color 150ms ease, border-radius 150ms ease-out,
    transform 150ms ease;
}

.show_more:hover {
  background: var(--dgrey);
  border-radius: 20px;
}

.show_more:active {
  transform: scale(0.9, 0.9);
}

.shuffle_icon {
  cursor: pointer;
  opacity: 0.3;
  margin: 0 0 0 10px;
  transition: opacity 150ms ease;
}

.shuffle_icon:hover {
  opacity: 1;
}

.shuffle_tooltip {
  opacity: 0;
  font-weight: 300;
  font-size: 1rem;
  margin: 0 0 0 10px;
  position: relative;
  top: -3px;
  display: inline-block;
  transition: opacity 150ms ease;
}

.visible {
  opacity: 0.4;
}

@media (max-width: 440px) {
  .list {
    grid-template: 130px / repeat(1, 1fr);
  }
}

@media (max-width: 767px) {
  .list {
    grid-template: 130px / repeat(2, 1fr);
  }
}
</style>
