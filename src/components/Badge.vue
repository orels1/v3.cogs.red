<template lang="pug">
  .Badge(:class="color") {{ content }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    text: String,
    type: String,
  },
})
export default class Badge extends Vue {
  get content() {
    return this.type ? this.type : this.text;
  }

  get color() {
    return this.type ? this.$style[this.type] : '';
  }
}
</script>

<style scoped>
.Badge {
  height: 17px;
  line-height: 17px;
  padding: 0 10px;
  font-size: 10px;
  color: #fff;
  background-color: #25a85c;
}

.approved {
  background: #25a85c;
}

.unapproved {
  background: #e91f1f;
}
</style>
