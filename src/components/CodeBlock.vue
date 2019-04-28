<template lang="pug">
  .CodeBlock
    input.input(
      type="text"
      ref="code"
      :value="code"
      readonly
    )
    button.copy(:class="copyState" @click="copy")
      FontAwesomeIcon.copy_icon(
        :icon="copyIcon"
      )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faPaste from '@fortawesome/fontawesome-pro-light/faPaste';

@Component({
  components: {
    FontAwesomeIcon,
  },
  props: {
    code: { type: String, default: '' },
  },
})
export default class Cog extends Vue {
  copyIcon = faPaste;
  copyState = '';

  copy() {
    this.$refs.code.select();
    document.execCommand('copy');
    this.copyState = this.$style.success;

    setTimeout(() => {
      this.copyState = '';
    }, 3000);
  }
}
</script>

<style scoped>
.CodeBlock {
  background: rgba(0, 0, 0, 0.9);
  display: flex;

  --copy: #666d7a;
  --copy_active: #434850;
}

.input {
  padding: 15px 15px;
  background: transparent;
  color: var(--white);
  border: none;
  flex: 1 0;
}

.input::selection {
  background: rgba(252, 252, 252, 0.2);
}

.copy {
  background: var(--copy);
  padding: 15px 15px;
  border: 0;
  font-size: 14px;
  cursor: pointer;
  transition: background 150ms ease;
}

.copy:hover {
  background: var(--copy_active);
}

.success {
  background: var(--success) !important;
}

.copy_icon {
  color: var(--white);
}
</style>


