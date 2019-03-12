/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
<<<<<<< HEAD
import Events from '../../models/Event';
=======
import keystone from 'keystone';
import Events from '../../models/EventsModel';
>>>>>>> ft (Sockets) : Integrate Web Sockets
import modelHelper from '../../helpers/modelHelper';
import { filterAndPaginate, getPaginationData } from '../../utils/search';

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
      const io = keystone.get('io');
      io.sockets.emit('addEvent', item);
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
  const filters = { _id: req.params.id };

  if (!req.user) {
    filters.archived = false;
  }

  Events.model.findOne(filters).exec((err, item) => {
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
  const otherFilters = {};

  // don't show archived events for unauthenticated users
  if (!req.user) otherFilters.archived = false;

  filterAndPaginate(Events, req, {}, otherFilters)
    .sort('-eventDate')
    .exec((err, data) => {
      res.status(200).send({
        status: 'success',
        data: data.results,
        pagination: getPaginationData(data),
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
      const io = keystone.get('io');
      io.sockets.emit('updateEvent', item);

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

    item.remove((err) => {
      const io = keystone.get('io');
      io.sockets.emit('deleteEvent', req.params.id);
      res.status(200).send({
        status: 'success',
        message: 'Event successfully deleted',
      }),
    );
  });
};
