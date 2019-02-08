import { SET_ACTIVE_SIDEBAR_INDEX } from '../../../constants';
import { setActiveSidebar, getActiveSidebar } from '../../sessions/sidebar';

export const initialState = {
  activeIndex: parseInt(getActiveSidebar(), 10),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_SIDEBAR_INDEX:
      setActiveSidebar(payload.activeIndex);
      return { ...state, ...payload };

    default:
      return state;
  }
};
