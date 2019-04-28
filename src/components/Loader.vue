<template lang="pug">
  .Loader(:class="big && 'big'")
    font-awesome-icon.icon(
      :class="inverted && 'inverted'"
      spin
      :icon="['fal', 'spinner-third']"
    )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    inverted: Boolean,
    big: Boolean,
  },
})
export default class Loader extends Vue {
}
</script>

<style scoped>
.Loader {
  font-size: 5em;
  margin: 40px auto;
}

.big {
  margin: 50px auto;
}

.icon {
  color: var(--ldark);
  margin: auto;
  display: block;
}

.inverted {
  color: color(--white);
}
</style>
