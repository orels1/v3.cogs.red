import { shallow, mount } from 'vue-test-utils';
import objProxy from 'identity-obj-proxy';

export const render = (Component, propsData = {}, options = { useShallow: true }) => {
  if (options.useShallow) {
    return ({
      wrapper: shallow(Component, { propsData }),
      props: propsData,
    });
  }

  return ({
    wrapper: mount(Component, { propsData }),
    props: propsData,
  });
};

export const CssModuleTestHelperMixin = {
  install(Vue) {
    Vue.mixin({
      created() {
        this.$style = objProxy;
      },
    });
  },
};
