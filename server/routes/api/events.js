/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import keystone from 'keystone';
import Events from '../../models/Event';
import modelHelper from '../../helpers/modelHelper';
import { filterAndPaginate, getPaginationData } from '../../utils/search';
import {
  eventArchiveState,
  eventMessage,
} from '../../middleware/repository/archiveHelper';

export const Event = keystone.list('Event');

const updateMainEvent = (mainEvent) => {
  if (mainEvent && mainEvent === true) {
    Events.model
      .update({}, { $set: { mainEvent: false } }, { multi: true })
      .exec((err, result) => {});
  }
};

export const create = (req, res) => {
  const { mainEvent } = req.body;

  updateMainEvent(mainEvent);

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
    .catch((err) => res.apiError({ err }));
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
    updateMainEvent(mainEvent);

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

export const archive = async (req, res) => {
  try {
    const archived = await eventArchiveState(req.params.id);

    await Event.model.findByIdAndUpdate(req.params.id, archived);
    return res.status(200).json({
      message: eventMessage(archived.archived),
      archived: archived.archived,
    });
  } catch (e) {
    return res.status(404).send({
      message: 'Event with that id doesnot exist',
    });
  }
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
      });
    });
  });
};
