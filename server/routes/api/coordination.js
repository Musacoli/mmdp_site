
import Coordination from '../../models/Coordination';
import Highlight from '../../models/Highlight';

export const create = (req, res) => {
  const item = new Coordination.model();

  const highlight = req.body.highlight.map(data => ({ name: data }));
  Highlight.model.insertMany(highlight)
    .then((result) => {
      item.getUpdateHandler(req)
        .process({
          ...req.body,
          highlight: result.map(d => d._id),
        }, (err) => {
          if (err) return res.apiError('create error', err);
          res.apiResponse({
            item,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const update = (req, res) => {
  Coordination.model.findById(req.params.id).exec((err, item) => {
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
  Coordination.model.find((err, items) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
      items,
    });
  });
};

export const get = (req, res) => {
  Coordination.model.findById(req.params.id)
    .populate('highlight')
    .exec((err, item) => {
      if (err) return res.apiError('database error', err);
      if (!item) return res.apiError('not found');

      res.apiResponse({
        item,
      });
    });
};

export const remove = (req, res) => {
  Coordination.model.findById(req.params.id).exec((err, item) => {
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
