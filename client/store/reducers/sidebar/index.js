import { SET_ACTIVE_SIDEBAR_INDEX } from '../../../constants';

export const initialState = {
  activeIndex: 100,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_SIDEBAR_INDEX:
      return { ...state, ...payload };

    default:
      return state;
  }
};

