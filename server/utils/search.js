/**
 * https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript?answertab=votes#tab-top
 * Protect against ReDoS.
 * @param query
 * @returns {*}
 */
const escapeRegExp = (query) => {
  return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

/**
 * Create a safe search regex for given value.
 *
 * @param value
 * @returns {RegExp}
 */
const getRegex = (value) => {
  return new RegExp(escapeRegExp(value), 'gi');
};

/**
 * Create an $or mongoose regex query for all parameters specified on the query.
 * Use the overrides parameter to override any of the values in req.query. To
 * remove a filter, set it as undefined on the overrides object. Use the
 * otherFilters parameter to add other mongoose filters to the final
 * filters object.
 * Example: {
 *    $or: [{name: {$regex: 'val'}}, {email: {$regex: 'val'}}],
 *    confirmed: {$ne: true}
 * }.
 * The $or clause contains the search filters. The other filters are added to
 * the filters as they are. This method is useful if you have used Keystone
 * paginate method. Pass its result as the filters option of the paginate
 * method e.g. User.paginate({
 *   page: req.query.page || 1,
 *   perPage: 8,
 *   maxPages: 10,
 *   filters: getSearchQuery(req),
 * })
 *
 * @param req
 * @param overrides
 * @param otherFilters
 * @returns {{}}
 */
export const getSearchQuery = (req, overrides = {}, otherFilters = {}) => {
  const query = { ...req.query, ...overrides };

  // remove pagination filters
  delete query.page;
  delete query.perPage;

  const filters = { ...otherFilters };

  const searchFilters = [];

  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (value !== undefined) {
      searchFilters.push({
        [key]: { $regex: getRegex(value) },
      });
    }
  });

  if (searchFilters.length) {
    filters.$or = searchFilters;
  }

  return filters;
};

/**
 * This method allows you to make searches based on partial or exact values of
 * fields. For example it will find 'John' when the search parameter value is
 * 'hn'. It returns a mongoose query on which you can chain other mongoose
 * query methods e.g. sort(). Use the overrides parameter to override any
 * of the values in req.query. To remove a filter, set it as undefined
 * on the overrides object.Use the otherFilters parameter to add other
 * mongoose filters to the final filters object. To execute the query
 * and get the results call the exec() method e.g.
 *
 * const results = await filterModel(User, req).exec();
 * or
 * filterModel(User, req).exec(err, data => {
 *    ...handle error or data
 * });
 *
 * @param model - Keystone model
 * @param req - request
 * @param overrides
 * @param otherFilters
 */
export const filterModel = (model, req, overrides = {}, otherFilters = {}) =>
  model.model.find(getSearchQuery(req, overrides, otherFilters));

/**
 * This method allows you to make searches based on partial or exact values of
 * fields. It returns keystone-paginated results. It will find 'John' when the
 * search parameter value is 'hn'. It returns a mongoose query on which you
 * can chain other mongoose query methods e.g. sort(). Use the overrides
 * parameter to override any of the values in req.query. To remove a
 * filter, set it as undefined on the overrides object.Use the
 * otherFilters parameter to add other mongoose filters to
 * the final filters object. To execute the query and get
 * the results call the exec() method e.g.
 *
 * filterAndPaginate(User, req).exec((err, data) => {
 *    ...handle error or data
 * });
 *
 * @param model
 * @param req
 * @param overrides
 * @param otherFilters
 */
export const filterAndPaginate = (
  model,
  req,
  overrides = {},
  otherFilters = {},
) =>
  model.paginate({
    page: req.query.page || 1,
    perPage: req.query.perPage || 8,
    maxPages: 10,
    filters: getSearchQuery(req, overrides, otherFilters),
  });

/**
 * Get all pagination data from the query result. This can be used to handle
 * the result of running filterAndPaginate in order to separate results
 * from pagination data e.g.
 *
 * filterAndPaginate(User, req).exec((err, data) => {
 *   return res.json({
 *     items: data.results,
 *     pagination: getPaginationData(data),
 *   })
 * }
 *
 * This will helps to separate the actual results array from the pagination
 * data.
 *
 * @param data
 */
export const getPaginationData = (data) => {
  const {
    total,
    currentPage,
    totalPages,
    pages,
    previous,
    next,
    first,
    last,
  } = data;

  return { total, currentPage, totalPages, pages, previous, next, first, last };
};
