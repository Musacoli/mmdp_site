import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate } from '../../../utils/search';

export const Research = () => keystone.list('Research');

export const create = async (req, res) => {
  const researchItem = new Research().model();
  try {
    const newResearch = await modelHelper.process(researchItem, req);
    return res.sendSuccess(
      {
        research: newResearch,
      },
      201,
      sprintf(responseMessage.RESOURCE_CREATED, 'Research'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const retrieve = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      res.status(200).send({
        status: 'success',
        message: sprintf(responseMessage.RESOURCE_FETCHED, 'Research'),
        data: item,
      });
    });
};

export const update = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      item.getUpdateHandler(req).process(req.body, (error) => {
        if (error)
          return res.status(400).send({ message: 'update error', error });

        return res.status(200).send({
          message: sprintf(responseMessage.RESOURCE_UPDATED, 'Research'),
          data: item,
        });
      });
    });
};

export const list = async (req, res) => {
  const otherFilters = {};

  // don't show archived events for unauthenticated users
  if (!req.user) otherFilters.archived = false;

  filterAndPaginate(Research(), req, {}, otherFilters).exec((err, results) => {
    if (err) {
      return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    }
    res.status(200).send({
      status: 'success',
      message: sprintf(responseMessage.RESOURCE_FETCHED, 'Research'),
      data: results,
    });
  });
};

export const remove = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      item.remove(() =>
        res.status(204).send({
          message: 'Research successfully deleted',
        }),
      );
    });
};
