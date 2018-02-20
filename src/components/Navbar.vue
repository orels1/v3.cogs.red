<template lang="pug">
  div(:class="$style.Navbar")
    div(:class="$style.logo") Cogs.red
    div(:class="$style.search")
      input(
        :class="$style.search_input"
        type="text"
        placeholder="ctrl + p"
        v-model.trim="search"
        @keyup="loadSearch"
        v-shortkey.focus="['ctrl', 'p']"
      )
    div(:class="$style.links")
      router-link(
        v-for="item in menu"
        :key="item.key"
        :class="$style.link"
        :active-class="$style.active"
        :to="item.to"
        :href="item.external ? item.to : undefined"
        exact
      ) {{ item.name }}
      a(
        :class="$style.link"
        target="_blank"
        href="https://discord.gg/red"
      ) Community
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Navbar extends Vue {
  menu = [
    { to: '/', key: 'cogs', name: 'Cogs' },
    { to: '/about', key: 'about', name: 'About' },
    { to: '/tags', key: 'tags', name: 'Tags' },
  ];

  search = '';
  prevSearch = '';
  prevPage = null;
  loadSearch() {
    // initial search field interaction
    if (!this.prevSearch.length && !this.search.length) {
      this.prevPage = this.$route.path;
      return;
    }

    this.prevSearch = this.search;

    // clearing the field
    if (this.search.length === 0) {
      this.$router.push(this.prevPage || '/');
      return;
    }

    // first time navigation
    if (this.search.length < 2) return;
    if (this.$route.name !== 'Search') {
      this.$router.push(`/search/${encodeURIComponent(this.search)}`);
      return;
    }

    // consecutive navigation without polluting the history
    this.$router.replace({ params: { search: encodeURIComponent(this.search) } });
  }

  created() {
    // for direct search page navigation
    if (this.$route.name === 'Search') {
      this.search = decodeURIComponent(this.$route.params.search);
      this.prevSearch = this.$route.params.search;
    }
  }
}
</script>

<style lang="sass" module>
$mobile: 767px
$red: rgb(236,0,26)
$grey: rgb(114,114,114)

.Navbar
  display: flex
  justify-content: space-between
  box-shadow: 0 0 10px rgba(0,0,0,.1)
  @media (max-width: $mobile)
    flex-direction: column

.logo
  width: 100px
  height: 50px
  line-height: 50px
  padding: 0 20px

.search
  @media (max-width: $mobile)
    width: 100%
    display: none

.search_input
  border: none
  line-height: 30px
  margin-top: 10px
  min-width: 300px
  outline: none !important
  padding: 0 10px
  @media (max-width: $mobile)
    width: 100%
    padding: 0 20px

  &:focus
    border-bottom: 1px solid rgba(0,0,0,.1)

.links
  display: flex
  @media (max-width: $mobile)
    flex-direction: column
    display: none

.link
  line-height: 50px
  padding: 0 20px
  text-transform: uppercase
  text-decoration: none
  color: $grey
  transition: color 150ms ease

  &:hover
    color: $red

.active
  color: $red
</style>
