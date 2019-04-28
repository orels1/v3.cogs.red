<template lang="pug">
  .Infobar
    .sidebar.sidebarLevel
    .content_wrapper
      .title {{ title }}
      .content
        slot
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    level: { type: String, default: 'default' },
    title: { type: String, default: 'disclaimer' },
  },
})
export default class Infobar extends Vue {
  get sidebarLevel() {
    return this.level ? this.$style[this.level] : this.$style.default;
  }
}
</script>

<style scoped>
.Infobar {
  color: var(--black);
  margin: 20px 0;
  display: flex;
}

.sidebar {
  min-height: 50px;
  width: 10px;
}

.default {
  background: var(--warn);
}

.danger {
  background: var(--danger);
}

.title {
  font-size: 20px;
  text-transform: uppercase;
}

.content_wrapper {
  margin: 0 0 0 10px;
  display: flex;
  flex-direction: column;
}

.content {
  font-size: 14px;
  margin: 5px 0 0 0;
  color: var(--lblack);
}
</style>
