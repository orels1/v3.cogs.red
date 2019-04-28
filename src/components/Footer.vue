<template lang="pug">
  .Footer.
    Want to see v3.cogs.red faster? #[a.link(href="https://github.com/orels1/v3.cogs.red") get involved!]
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Footer extends Vue {
}
</script>

<style scoped>
.Footer {
  color: var(--white);
  background: var(--blueish);
  font-size: 12px;
  text-transform: uppercase;
  margin: 40px 0 0 0;
  width: 100%;
  min-height: 100px;
  line-height: 100px;
  text-align: center;
}

.link {
  color: var(--lred);
  text-decoration: none;
}
</style>
