<template lang="pug">
  .SearchPage
    PageHeader Search Results
    .SearchPage_inner
      .list(v-if="!notFound")
        Cog(v-for="cog in filteredCogs" :key="cog._id" :cog="cog")
      p.text(v-if="notFound") No matching cogs were found
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Cog from '@/components/Cog';
import PageHeader from '@/components/PageHeader';
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

  updated;
}
</script>

<style scoped>
.SearchPage {
  color: #000;
  width: 100%;
}

.SearchPage_inner {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px 0 20px;
}

.list {
  display: grid;
  grid-template: 130px / repeat(3, 1fr);
  grid-gap: 10px 20px;
}

.text {
  color: var(--lblack);
}

@media (max-width: var(--tiny)) {
  .list {
    grid-template: 130px / repeat(1, 1fr);
  }
}

@media (max-width: var(--mobile)) {
  .list {
    grid-template: 130px / repeat(2, 1fr);
  }
}
</style>

