/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Events from '../../models/EventsModel';

exports.create = (req, res) => {
  const { mainEvent } = req.body;

  if (mainEvent && mainEvent === true) {
    Events.model
      .update({}, { $set: { mainEvent: false } }, { multi: true })
      .exec((err, result) => {});
  }

  const item = new Events.Model();

  item.getUpdateHandler(req).process(req.body, (err) => {
    if (err) {
      return res.apiError({ err });
    }
    res.status(201).send({
      status: 'success',
      data: item,
    });
  });
};

exports.get = (req, res) => {
  Events.model.findById(req.params.id).exec((err, item) => {
    if (!item) {
      return res.status(404).send({
        status: 'error',
        message: 'Invalid Object Id',
      });
    }

    res.status(200).send({
      status: 'success',
      data: item,
    });
  });
};

exports.list = (req, res) => {
  Events.paginate({
    page: req.query.page || 1,
    perPage: 8,
    maxPages: 10,
  })
    .sort('-dateCreated')
    .populate('')
    .exec((err, results) => {
      res.status(200).send({
        status: 'success',
        data: results,
      });
    });
};

exports.update = (req, res) => {
  Events.model.findById(req.params.id).exec((err, item) => {
    if (!item) {
      return res.status(404).send({
        status: 'error',
        message: 'Invalid Object Id',
      });
    }

    const { mainEvent } = req.body;

    if (mainEvent && mainEvent === true) {
      Events.model
        .update({}, { $set: { mainEvent: false } }, { multi: true })
        .exec((err, result) => {});
    }

    item.getUpdateHandler(req).process(req.body, (err) => {
      if (err) {
        return res.apiError({ err });
      }

      res.status(200).send({
        status: 'success',
        data: item,
      });
    });
  });
};

exports.remove = (req, res) => {
  Events.model.findById(req.params.id).exec((err, item) => {
    if (!item) {
      return res.status(404).send({
        status: 'error',
        message: 'Invalid Object Id',
      });
    }

    item.remove((err) =>
      res.status(200).send({
        status: 'success',
        message: 'Successfully Deleted',
      }),
    );
  });
};
