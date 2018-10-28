<template lang="pug">
  div(:class="$style.TagsPage")
    TagsTitle Tags
    
    div(:class="$style.list" v-if="loaded")
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
import Title from '@/components/singles/Title';
import Tag from '@/components/singles/Tag';

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

<style lang="sass" module>
  $mobile: 767px
  $tiny: 440px

  .TagsPage
    width: 100%
    color: #000
    max-width: 1000px
    padding: 0 20px
    margin: 0 auto

  .list
    display: grid
    grid-template: 41px / repeat(3, 1fr)
    @media (max-width: $mobile)
      grid-template: 41px / repeat(2, 1fr)
    @media (max-width: $tiny)
      grid-template: 41px / repeat(1, 1fr)
    grid-gap: 10px 20px

</style>

