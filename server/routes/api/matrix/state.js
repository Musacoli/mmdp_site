import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate, getPaginationData } from '../../../utils/search';
import modelHelper from '../../../helpers/modelHelper';

const State = () => keystone.list('StateMap');

export const create = async (req, res) => {
  State.model
    .insertMany(req.body.data)
    .then((data) => {
      const {
        data: { length },
      } = req.body;
      const count = length > 1 ? `${length} states ` : '1 state';
      return res.status(201).json({
        message: `${count} successfully added`,
        data,
      });
    })
    .catch((error) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    });
};

export const list = async (req, res) => {
  const otherFilters = {};
  filterAndPaginate(State(), req, {}, otherFilters).exec(async (err, data) => {
    if (err) return res.status(400).json(err);
    res.status(200).send({
      status: 'success',
      message: sprintf(responseMessage.RESOURCE_FETCHED, 'states'),
      data: data.results,
      pagination: getPaginationData(data),
    });
  });
};

export const update = async (req, res) => {
  const { uniqueId } = req.params;
  const { countryName } = req.body;
  try {
    const state = await State().model.findOne({ uniqueId, countryName });
    if (!state) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'State map'),
        404,
      );
    }
    const updatedState = await modelHelper.process(state, req);
    return res.sendSuccess(
      {
        state: updatedState,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'State map'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
