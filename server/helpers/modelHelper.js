export default {
  process: (model, req) => new Promise((resolve, reject) => {
    model.getUpdateHandler(req).process(req.body, (err) => {
      if (err) return reject(err);
      return resolve(model);
    });
  }),
};
