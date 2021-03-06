import About from '../../../models/about/About';

export const create = (req, res) => {
  // eslint-disable-next-line new-cap
  const item = new About.model();

  item.getUpdateHandler(req).process(
    {
      ...req.body,
      // eslint-disable-next-line no-underscore-dangle
      creator: req.user._id,
    },
    (err) => {
      if (err) return res.apiError('create error', err);
      res.apiResponse({
        item,
      });
    },
  );
};

export const update = (req, res) => {
  About.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item
      .getUpdateHandler(req)
      .process({ ...req.body, updatedAt: new Date() }, (error) => {
        if (error) return res.apiError('update error', err);

        return res.apiResponse({
          item,
        });
      });
  });
};

export const list = (req, res) => {
  About.model.find((err, items) => {
    if (err) return res.apiError('database error', err);

    return res.apiResponse({
      items,
    });
  });
};

export const get = (req, res) => {
  About.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      item,
    });
  });
};
