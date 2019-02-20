/**
 *  extract url parameters from an object
 *  params {Object} params
 */
export const formatObjectToParams = (params) => {
  let url = '';
  if (typeof params === 'object') {
    if (Object.keys(params).length >= 1) {
      Object.keys(params).forEach((key) => {
        url += `${key}=${params[key]}&`;
      });
      // remove last &
      url = url.slice(0, -1);
    }
  }
  return url;
};

/**
 * Get all data required for pagination by the pagination component.
 *
 * @param data
 */
export const getPaginationData = (data) => {
  const { total, currentPage, totalPages, previous, next } = data;
  return { total, currentPage, totalPages, previous, next };
};
