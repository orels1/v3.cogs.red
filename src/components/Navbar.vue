<template lang="pug">
  div(:class="$style.Navbar")
    div(:class="$style.logo") Cogs.red
    div(:class="$style.search")
      input(
        :class="$style.search_input"
        type="text"
        placeholder="cmd + shift + p"
        v-model.trim="search"
      )
    div(:class="$style.links")
      router-link(
        v-for="item in menu"
        :key="item.key"
        :class="$style.link"
        :active-class="$style.active"
        :to="item.to"
        exact
      ) {{ item.name }}
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
}
</script>

<style lang="sass" module>
.Navbar
  display: flex
  justify-content: space-between
  box-shadow: 0 0 10px rgba(0,0,0,.1)

.logo
  width: 100px
  height: 50px
  line-height: 50px
  padding: 0 20px

.search

.search_input
  border: none
  line-height: 30px
  margin-top: 10px
  min-width: 300px
  outline: none !important
  padding: 0 10px

  &:focus
    border-bottom: 1px solid rgba(0,0,0,.1)

.links
  display: flex

.link
  line-height: 50px
  padding: 0 20px
  text-decoration: none

.active
  font-weight: bold
</style>
