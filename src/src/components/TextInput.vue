<template lang="pug">
  .textInput(:class="[active && 'active']")
    input.field(
      @keyup.enter="onSubmit"
      :value="value"
      @input="onInput"
      @focus="active = true"
      @blur="active = false"
      :placeholder="placeholder"
    )
    .label(:class="[label.length && 'active']") {{label}}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    value: String,
    placeholder: { type: String, default: '' },
  },
})
export default class TextInput extends Vue {
  active = false;

  get label() {
    return this.active && this.value.length ? this.placeholder : '';
  }

  onInput(event) {
    this.$emit('input', event.target.value);
  }

  onSubmit() {
    this.$emit('submit');
  }
}
</script>

<style scoped>
.textInput {
  width: 100%;
  display: flex;
  position: relative;
  --red: rgba(236, 0, 26, 0.8);
  border-bottom: 1px solid hsl(0, 0%, 80%);
  transition: border-bottom-color 200ms ease-in-out;
}

.textInput.active {
  border-bottom-color: var(--red);
}

.field {
  width: 100%;
  border: none;
  padding: 7px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
}

.label {
  position: absolute;
  right: 7px;
  top: 7px;
  font-size: 14px;
  color: hsla(0, 0%, 60%, 0);
  transition: color 300ms ease;
}

.label.active {
  color: hsla(0, 0%, 50%, 1);
}
</style>
