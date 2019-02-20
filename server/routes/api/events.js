/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Events from '../../models/EventsModel';
import modelHelper from '../../helpers/modelHelper';
import { filterAndPaginate } from '../../utils/search';

export const create = (req, res) => {
  const { mainEvent } = req.body;

  if (mainEvent && mainEvent === true) {
    Events.model
      .update({}, { $set: { mainEvent: false } }, { multi: true })
      .exec((err, result) => {});
  }

  // eslint-disable-next-line new-cap
  const item = new Events.model();

  modelHelper
    .process(item, req)
    .then(() => {
      res.status(201).send({
        status: 'success',
        data: item,
      });
    })
    .catch((err) => {
      return res.apiError({ err });
    });
};

export const get = (req, res) => {
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

export const list = (req, res) => {
  filterAndPaginate(Events, req)
    .sort('-dateCreated')
    .populate('')
    .exec((err, results) => {
      res.status(200).send({
        status: 'success',
        data: results,
      });
    });
};

export const update = (req, res) => {
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

export const remove = (req, res) => {
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
