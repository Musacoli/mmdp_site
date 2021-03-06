import GovernorMessage from '../../../models/about/GovernorMessage';

export const create = (req, res) => {
  // eslint-disable-next-line new-cap
  const item = new GovernorMessage.model();

  item.getUpdateHandler(req).process(
    {
      // eslint-disable-next-line no-underscore-dangle
      creator: req.user._id,
      ...req.body,
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
  GovernorMessage.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item
      .getUpdateHandler(req)
      .process({ ...req.body, updatedAt: new Date() }, (error) => {
        if (err) return res.apiError('update error', error);

        res.apiResponse({
          item,
        });
      });
  });
};

export const list = (req, res) => {
  GovernorMessage.model.find((err, items) => {
    if (err) return res.apiError('database error', err);

    return res.apiResponse({
      items,
    });
  });
};

export const get = (req, res) => {
  GovernorMessage.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      item,
    });
  });
};
