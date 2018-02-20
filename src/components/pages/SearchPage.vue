<template lang="pug">
  div(:class="$style.SearchPage")
    PageHeader Search Results
    div(:class="$style.SearchPage_inner")
      div(:class="$style.list" v-if="!notFound")
        Cog(v-for="cog in filteredCogs" :key="cog._id" :cog="cog")
      p(:class="$style.text" v-if="notFound") No matching cogs were found
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Cog from '@/components/singles/Cog';
import PageHeader from '@/components/singles/PageHeader';
import c from '@/constants';

@Component({
  components: {
    Cog,
    PageHeader,
  },
})
export default class SearchPage extends Vue {
  filteredCogs = [];
  oldSearch = '';
  notFound = false;
  // TODO: add proper fetching when loading in directly onto this page

  // initial render
  async created() {
    this.oldSearch = this.$route.params.search;
    try {
      const resp = await fetch(`${c.SEARCH}/${this.oldSearch}`);
      if (resp.status === 404) {
        this.notFound = true;
        return;
      }
      const json = await resp.json();
      this.filteredCogs = json.results.list;
      this.notFound = false;
    } catch (e) {
      // console.error(e);
    }
  }

  // route updates
  async beforeUpdate() {
    if (this.$route.params.search !== this.oldSearch) {
      try {
        const resp = await fetch(`${c.SEARCH}/${this.$route.params.search}`);
        if (resp.status === 404) {
          this.notFound = true;
          return;
        }
        const json = await resp.json();
        this.filteredCogs = json.results.list;
        this.notFound = false;
      } catch (e) {
        // console.error(e);
      }
      this.oldSearch = this.$route.params.search;
    }
  }

  updated
}
</script>

<style lang="sass" module>
$darkish: rgba(#000, .7)
$mobile: 767px
$tiny: 440px

.SearchPage
  color: #000

.SearchPage_inner
  display: flex
  flex-direction: column
  max-width: 1000px
  margin: 0 auto
  padding: 40px 20px 0 20px

.list
  display: grid
  grid-template: 130px / repeat(3, 1fr)
  @media (max-width: $mobile)
    grid-template: 130px / repeat(2, 1fr)
  @media (max-width: $tiny)
    grid-template: 130px / repeat(1, 1fr)
  grid-gap: 10px 20px

.text
  color: $darkish
</style>

