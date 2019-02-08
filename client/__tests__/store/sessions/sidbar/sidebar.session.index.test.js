import {
  getActiveSidebar,
  setActiveSidebar,
} from '../../../../store/sessions/sidebar';

const activeSideBarIndex = '1';

describe('Sidebar Session', () => {
  it('should set active sidebar index', () => {
    setActiveSidebar(activeSideBarIndex);
    expect(getActiveSidebar()).toBe(activeSideBarIndex);
  });
});
