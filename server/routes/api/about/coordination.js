import Coordination from '../../../models/about/Coordination';
import Highlight from '../../../models/about/Highlight';

export const create = (req, res) => {
  // eslint-disable-next-line new-cap
  const item = new Coordination.model();

  const highlight = req.body.highlight.map((data) => ({ name: data }));
  Highlight.model
    .insertMany(highlight)
    .then((result) => {
      // eslint-disable-next-line
      item.getUpdateHandler(req).process(
        {
          // eslint-disable-next-line no-underscore-dangle
          creator: req.user._id,
          ...req.body,
          // eslint-disable-next-line no-underscore-dangle
          highlight: result.map((d) => d._id),
        },
        (err) => {
          if (err) return res.apiError('create error', err);

          // eslint-disable-next-line
          item.populate('highlight', (err, item) => {
            // eslint-disable-next-line
            if (err) return res.apiError('create error', err);
            return res.apiResponse({
              item,
            });
          });
        },
      );
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

export const update = (req, res) => {
  Coordination.model.findById(req.params.id).exec((err, item) => {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    const highlight = req.body.highlight.map((data) => ({ name: data }));

    Highlight.model.deleteMany(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: { $in: [...req.body.highlightIds] },
      },
      // eslint-disable-next-line
      (err) => {
        if (err) return res.apiError('update error', err);

        Highlight.model
          .insertMany(highlight)
          .then((result) => {
            // eslint-disable-next-line
            item.getUpdateHandler(req).process(
              {
                ...req.body,
                // eslint-disable-next-line no-underscore-dangle
                highlight: result.map((d) => d._id),
                updatedAt: new Date(),
              },
              // eslint-disable-next-line
              (err) => {
                if (err) return res.apiError('update error', err);
                // eslint-disable-next-line
                item.populate('highlight', (err, item) => {
                  return res.apiResponse({
                    item,
                  });
                });
              },
            );
          }) // eslint-disable-next-line
          .catch((err) => {
            res.status(500).json({ err });
          });
      },
    );
  });
};

export const list = (req, res) => {
  Coordination.model
    .find()
    .populate('highlight')
    .exec((err, items) => {
      if (err) return res.apiError('database error', err);

      return res.apiResponse({
        items,
      });
    });
};

export const get = (req, res) => {
  Coordination.model
    .findById(req.params.id)
    .populate('highlight')
    .exec((err, item) => {
      if (err) return res.apiError('database error', err);
      if (!item) return res.apiError('not found');

      res.apiResponse({
        item,
      });
    });
};
