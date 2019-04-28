<template lang="pug">
  .Loader(:class="big && 'big'")
    FontAwesomeIcon.icon(
      :class="inverted && 'inverted'"
      spin
      :icon="spinnerIcon"
    )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSpinner from '@fortawesome/fontawesome-pro-light/faSpinnerThird';

@Component({
  components: {
    FontAwesomeIcon,
  },
  props: {
    inverted: Boolean,
    big: Boolean,
  },
})
export default class Loader extends Vue {
  spinnerIcon = faSpinner;
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

