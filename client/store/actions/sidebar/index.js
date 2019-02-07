import { SET_ACTIVE_SIDEBAR_INDEX } from '../../../constants';

export const setActiveSidebarIndex = (payload) => ({
  type: SET_ACTIVE_SIDEBAR_INDEX,
  payload,
});

export default setActiveSidebarIndex;
