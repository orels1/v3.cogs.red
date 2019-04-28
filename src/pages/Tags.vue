<template lang="pug">
  .TagsPage
    TagsTitle Tags
    .list(v-if="loaded")
      Tag(
        v-for="tag in tags"
        :key="tag.name"
        :tag="tag"
      )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import Title from '@/components/Title';
import Tag from '@/components/Tag';

@Component({
  components: {
    TagsTitle: Title,
    Tag,
  },
  methods: {
    ...mapActions(['fetchTags']),
  },
  computed: mapState(['tags']),
})
export default class TagsPage extends Vue {
  loaded = false;

  async created() {
    try {
      if (this.tags.length > 0) {
        this.loaded = true;
        return;
      }

      if (this.tags.length === 0) {
        await this.fetchTags();
      }

      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }

}
</script>

<style scoped>
.TagsPage {
  width: 100%;
  color: #000;
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
}

.list {
  display: grid;
  grid-template: 41px / repeat(3, 1fr);
  grid-gap: 10px 20px;
}

@media (max-width: var(--tiny)) {
  grid-template: 41px / repeat(1, 1fr);
}

@media (max-width: var(--mobile)) {
  grid-template: 41px / repeat(2, 1fr);
}
</style>

