
import Objectives from '../../models/Objectives';

export const create = (req, res) => {
  const item = new Objectives.model();

  item.getUpdateHandler(req).process(req.body, (err) => {
    if (err) return res.apiError('create error', err);
    res.apiResponse({
      item,
    });
  });
};

export const update = (req, res) => {
  Objectives.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.getUpdateHandler(req)
      .process({ ...req.body, updatedAt: new Date() }, (err) => {
        if (err) return res.apiError('update error', err);

        res.apiResponse({
          item,
        });
      });
  });
};

export const list = (req, res) => {
  Objectives.model.find((err, items) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
      items,
    });
  });
};

export const get = (req, res) => {
  Objectives.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse({
      item,
    });
  });
};

export const remove = (req, res) => {
  Objectives.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.getUpdateHandler(req).process({ archived: true }, (err) => {
      if (err) return res.apiError('remove error', err);
      res.apiResponse({
        item,
      });
    });
  });
};
