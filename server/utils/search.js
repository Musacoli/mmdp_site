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
 * Create an $or mongoose regex query for all parameters specified on the query. Use
 * the overrides method to override filters passed in request and add also add more
 * filters. Example: {$or: [{name: {$regex: 'val'}}, {email: {$regex: 'val'}}]}.
 * This method is useful if you have used Keystone paginate method. Pass its
 * result as the filters option of the paginate method e.g.
 * User.paginate({
 *   page: req.query.page || 1,
 *   perPage: 8,
 *   maxPages: 10,
 *   filters: getSearchQuery(req),
 * }
 *
 * @param req
 * @param overrides
 * @returns {Array}
 */
export const getSearchQuery = (req, overrides = {}) => {
  const query = { ...req.query, ...overrides };

  delete query.page;

  const filters = [];

  Object.keys(query).forEach((key) => {
    filters.push({
      [key]: { $regex: getRegex(query[key]) },
    });
  });

  return filters.length ? { $or: filters } : {};
};

/**
 * This method allows you to make searches based on partial or exact values of fields. For
 * example it will find 'John' when the search parameter value is 'hn'. It returns a
 * mongoose query on which you can chain other mongoose query methods e.g. limit(x).
 * To finally execute the query and get the results call the exec() method e.g.
 * const results = await filterModel(User, req).exec();
 * or
 * filterModel(User, req).exec(err, results => {...handle error or results});
 *
 * @param model - Keystone model
 * @param req - request
 */
export const filterModel = (model, req) =>
  model.model.find(getSearchQuery(req));

/**
 * This method allows you to make searches based on partial or exact values of fields. It
 * returns keystone-paginated results. It will find 'John' when the search parameter
 * value is 'hn' To finally execute the query and get the results call the exec()
 * method e.g.
 * filterAndPaginate(User, req).exec(err, results => {...handle error or results});
 *
 * @param model
 * @param req
 */
export const filterAndPaginate = (model, req) =>
  model.paginate({
    page: req.query.page || 1,
    perPage: 8,
    maxPages: 10,
    filters: getSearchQuery(req),
  });
