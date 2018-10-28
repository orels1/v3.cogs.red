import CogPage from '@/pages/CogPage';
import { render } from '../utils';

const $route = {
  params: {
    user: 'orels1',
    repo: 'ORELS-Cogs',
    cog: 'steam',
  },
};

describe.skip('Cog page', () => {
  describe('disclaimer line', () => {
    test('hides by default', () => {
      const { wrapper } = render({ component: CogPage, mocks: { $route } });
      wrapper.setData({
        cog: {
          repo: { type: 'approved' },
        },
      });
      expect(wrapper.contains('.Infobar')).toBe(false);
    });

    test('shows if repo is unapproved', () => {
      const { wrapper } = render({
        component: CogPage,
        mocks: { $route },
      });
      wrapper.setData({
        cog: {
          repo: { type: 'unapproved' },
        },
      });
      expect(wrapper.contains('.Infobar')).toBe(true);
    });
  });
});
