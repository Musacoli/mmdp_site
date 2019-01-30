/* eslint-env jest */
import { SET_ACTIVE_SIDEBAR_INDEX } from '../../../../constants';
import { setActiveSidebarIndex } from '../../../../store/actions/sidebar';

describe('Sidebar Actions Creators', () => {
  it('should dispatch SET_ACTIVE_SIDEBAR_INDEX', () => {
    expect(setActiveSidebarIndex({}).type).toEqual(SET_ACTIVE_SIDEBAR_INDEX);
  });
});
