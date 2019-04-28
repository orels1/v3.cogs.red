<template lang="pug">
    router-link.Tag(:to="{ path: '/search/'+tag.name }" append)
      span.name {{ tag.name }}
      span.count {{ tag.count }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    tag: {
      type: Object,
      default: () => ({
        name: '',
        count: 0,
      }),
    },
  },
})

export default class Tag extends Vue {

}
</script>

<style scoped>
.Tag {
  color: var(--black);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid rgba(34, 37, 42, 0.2);
  transition: border 150ms ease;
  text-decoration: none;
}

.Tag:hover {
  border-color: rgba(34, 37, 42, 1);
}

.name {
  font-size: 16px;
}

.count {
  text-align: center;
}
</style>
