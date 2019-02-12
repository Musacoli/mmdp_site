import { MAX_RESOURCE_PER_PAGE } from '../constants/modelConstants';

export default {
  process: (model, req) =>
    new Promise((resolve, reject) => {
      model.getUpdateHandler(req).process(req.body, (err) => {
        if (err) return reject(err);
        return resolve(model);
      });
    }),
  getPageInfo: (reqQuery) => {
    let { page = 1, limit = MAX_RESOURCE_PER_PAGE } = reqQuery;
    page = parseInt(page, 10) - 1;
    limit = parseInt(limit, 10);
    page = Math.max(0, page);
    limit = Math.min(limit, MAX_RESOURCE_PER_PAGE);
    const offset = page * limit;
    return { offset, limit, page };
  },
  paginate: async (model, filter, pageQuery, fields = null) => {
    const { offset, limit } = pageQuery;
    return model.find(filter, fields, { skip: offset, limit });
  },
};
