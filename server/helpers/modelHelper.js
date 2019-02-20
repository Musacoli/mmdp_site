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
  update: (model, id, data, fields = []) => {
    return new Promise((resolve, reject) => {
      model
        .update({ _id: id }, { $set: data })
        .populate(fields)
        .exec((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  },
  findAll: (model, fields = []) => {
    return new Promise((resolve, reject) => {
      model
        .find({})
        .populate(fields)
        .exec((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  },
  find: (model, id, fields = []) => {
    return new Promise((resolve, reject) => {
      model
        .findOne({ _id: id })
        .populate(fields)
        .exec((err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
    });
  },
  populate: (model, fields = []) => {
    return new Promise((resolve, reject) => {
      model.populate(fields, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  deleteOne: (model, id) => {
    return model.deleteOne({ _id: id });
  },
  deleteMany: (model, ids) => {
    return model.deleteMany({ _id: { $in: ids } });
  },
};
