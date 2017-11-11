<template lang="pug">
  div(:class="$style.Navbar")
    div(:class="$style.links" v-for="item in menu")
      router-link(
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
    { to: '/', name: 'Cogs' },
    { to: '/about', name: 'About' },
    { to: '/tags', name: 'Tags' },
  ];
}
</script>

<style lang="sass" module>
.Navbar
  display: flex

.links
  display: flex

.link
  line-height: 50px
  padding: 0 20px
  text-decoration: none

.active
  font-weight: bold
</style>
