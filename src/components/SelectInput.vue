<template lang="pug">
  .textInput(:class="[active && 'active']")
    select.field(
      :value="value"
      ref="field"
      @change="onChange"
      @focus="active = true"
      @blur="active = false"
    )
      option(v-if="typeof placeholder !== 'undefined'" value="" disabled selected) {{placeholder}}
      option(
        v-for="option in options"
        :optionKeyProp="option[optionKeyProp]"
        :value="option.value"
      ) {{option.label}}
    fontawesome-icon.icon(
      :class="[active && 'active']"
      :icon="icon"
    )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faCaretDown from '@fortawesome/fontawesome-pro-light/faCaretDown';

@Component({
  components: {
    'fontawesome-icon': FontAwesomeIcon,
  },
  props: {
    value: String,
    placeholder: String,
    options: { type: Array, default: [] },
    optionKeyProp: { type: String, default: 'id' },
  },
})
export default class SelectInput extends Vue {
  icon = faCaretDown;
  active = false;

  get label() {
    return this.active && this.value.length ? this.placeholder : '';
  }

  // Supporting v-model
  onChange(event) {
    this.$refs.field.blur();
    this.$emit('input', event.target.value);
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
  background: transparent;
  appearance: unset;
}

.icon {
  position: absolute;
  right: 7px;
  top: 7px;
  color: hsla(0, 0%, 60%);
  transition: transform 200ms ease-in-out;
}

.icon.active {
  transform: rotate(180deg);
}
</style>
