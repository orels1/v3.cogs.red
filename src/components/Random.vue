<template lang="pug">
  .Random
    router-link.link(:to="{ path: `/cogs${data.links.self}` }" append)
      .inner
        .block
          .name {{ data.name }}
          .short {{ data.short }}
        .block
          .author
            .icon
              font-awesome-icon(:icon="['fal', 'user']")
            div {{ data.author.username }}
          .tags(v-if="data.tags.length > 0")
            .icon
              font-awesome-icon(:icon="['fal', 'tags']")
            div {{ data.tags.slice(0,3).join(', ') }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    data: {
      type: Object,
      default: () => ({
        author: '',
        tags: [],
        links: {},
      }),
    },
  },
})
export default class Random extends Vue {
}
</script>

<style scoped>
.link {
  color: #fcfcfc;
  text-decoration: none;
}

.Random {
  height: 100%;
}

.inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.block {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 18pt;
}

.short {
  font-size: 10pt;
}

.author {
  font-size: 10pt;
  display: flex;
}

.tags {
  font-size: 10pt;
  display: flex;
  margin: 5px 0 0 0;
}

.icon {
  color: var(--dwhite);
  align-self: center;
  margin: 0 3px 0 0;
  width: 20px;
}
</style>
