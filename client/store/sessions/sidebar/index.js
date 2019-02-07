import { ACTIVE_SIDEBAR_INDEX_KEY } from '../../../constants';

/**
 * Set active sidebar index
 * @param {!string} index jwt token from server
 * @param {!string} key token object key
 */
export const setActiveSidebar = (index) => {
  localStorage.setItem(ACTIVE_SIDEBAR_INDEX_KEY, index);
};

/**
 * Get active sidebar from localstorage
 * @param {!string} key token object key
 */
export const getActiveSidebar = () => {
  const activeSidebarIndex = localStorage.getItem(ACTIVE_SIDEBAR_INDEX_KEY);
  return activeSidebarIndex || 0;
};
