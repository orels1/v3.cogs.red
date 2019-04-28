<template lang="pug">
  .Statsbar
    Loader(v-if="!loaded" inverted big)
    .Statsbar_inner(v-if="loaded")
      .number_block
        .title Total Cogs
        .number_content {{ cogs.length }}
      .number_block.bottom_left
        .title Total Repos
        .number_content {{ repos.length }}
      .box_block.double_height
        .title Random Repo
        .box_block_content
          RandomBlock(:data="randomRepo" v-if="repos.length")
      .box_block.double_height
        .title Random Cog
        .box_block_content
          RandomBlock(:data="randomCog" v-if="cogs.length")
      .box_block.double_height
        .title Popular Tags
        .box_block_list
          router-link.list_item(
            :to="'/tags/' + tag.name"
            v-if="tags.length > 0"
            v-for="tag in tags.slice(0, 4)"
            :key="tag.name"
          ) {{ tag.name }}
          router-link.list_item_all(
            :to="'/tags'"
          ) Show all tags
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import random from 'lodash/random';
import Loader from '@/components/Loader';
import RandomBlock from '@/components/Random';

@Component({
  components: {
    RandomBlock,
    Loader,
  },
  computed: mapState(['cogs', 'repos', 'tags']),
  methods: {
    ...mapActions(['fetchTags']),
  },
})
export default class Statsbar extends Vue {
  loaded = false;

  get randomCogIndex {
    if (!this.cogs.length) return 0;
    return random(0, this.cogs.length - 1);
  }

  get randomRepoIndex() {
    if (!this.repos.length) return 0;
    return random(0, this.repos.length - 1);
  }

  get randomCog() {
    if (!this.cogs.length) return undefined;
    return this.cogs[this.randomCogIndex];
  }

  get randomRepo() {
    if (!this.repos.length) return undefined;
    return this.repos[this.randomRepoIndex];
  }

  async created() {
    if (this.tags.length === 0) {
      await this.fetchTags();
    }
    this.loaded = true;
  }
}
</script>

<style scoped>
.Statsbar {
  background: var(--blueish);
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 210px;
}

.Statsbar_inner {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: .5fr repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);
  grid-gap: 10px 20px;
  padding: 0 20px;
}

.title {
  color: var(--white);
  text-transform: uppercase;
  font-size: 18px;
}

.bottom_left {
  grid-column-start: 1;
  grid-row-start: 2;
}
  
.number_block {
  color: var(--white);
  display: flex;
  flex-direction: column;
}

.number_content {
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 100;
}

.box_block {
  color: var(--white);
  display: grid;
  grid-template-rows: 25px 1fr;
}

.box_block_content {
  border: 1px solid rgba(var(--white), .3);
  padding: 10px;
  margin: 10px 0 0 0;
  transition: border 150ms ease;
}

.box_block_content:hover {
  border: 1px solid rgba(252, 252, 252, 1);
}

.box_block_list {
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0;
  display: grid;
  align-content: space-between;
  grid-template-rows: repeat(5, 1fr);
  grid-row-gap: 5px;
}

.list_item {
  border: 1px solid rgba(252, 252, 252, .3);
  padding: 5px 10px;
  transition: border 150ms ease;
  font-size: 10pt;
  color: var(--white);
  text-decoration: none;
}

.list_item:hover {
  border: 1px solid rgba(252, 252, 252, 1);
}

.list_item_all {
  border: 1px solid rgba(252, 252, 252, .3);
  padding: 6px 10px 5px;
  transition: border 150ms ease;
  font-size: 10pt;
  color: var(--white);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
}

.list_item_all:hover {
  border: 1px solid rgba(252, 252, 252, 1);
}

@media (max-width: var(--mobile)) {
  .Statsbar_inner {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px repeat(3, 210px);
  }

  .bottom_left {
    grid-column-start: 2
    grid-row-start: 1
  }

  .double_height {
    grid-column-end: span 2;
  }
}

@media (min-width: var(--desktop)) {
  .double_height {
    grid-row-start: 1;
    grid-row-end: span 2;
  }
}
</style>
