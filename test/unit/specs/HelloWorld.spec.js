import Vue from 'vue';
import { CssModuleTestHelperMixin } from '../utils';

Vue.use(CssModuleTestHelperMixin);

describe('Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
