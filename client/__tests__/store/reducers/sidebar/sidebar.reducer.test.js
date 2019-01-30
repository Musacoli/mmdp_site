/* eslint-env jest */
import { SET_ACTIVE_SIDEBAR_INDEX } from '../../../../constants';
import sidebarReducer, { initialState } from '../../../../store/reducers/sidebar';

describe('Sidebar Reducer', () => {
  it('should provide an initial state', () => {
    expect(sidebarReducer(initialState, {})).toEqual(initialState);
  });
  it('should set active sidebar index', () => {
    expect(sidebarReducer(null, {
      type: SET_ACTIVE_SIDEBAR_INDEX,
      payload: { activeIndex: 1 },
    }).activeIndex).toEqual(1);
  });
});
