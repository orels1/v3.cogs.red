import { shallow, mount, createLocalVue } from '@vue/test-utils';
import objProxy from 'identity-obj-proxy';
// import VueRouter from 'vue-router';

export const CssModuleTestHelperMixin = {
  install(Vue) {
    Vue.mixin({
      created() {
        this.$style = objProxy;
      },
    });
  },
};

const localVue = createLocalVue();
// localVue.use(VueRouter);
localVue.use(CssModuleTestHelperMixin);

export const render = ({
  component,
  props = {},
  mocks = {},
  useShallow = true,
}) => {
  if (useShallow) {
    return ({
      wrapper: shallow(component, { props, mocks, localVue }),
      props,
    });
  }

  return ({
    wrapper: mount(component, { props, mocks, localVue }),
    props,
  });
};
