/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const State = () => keystone.list('State');
export const StakeholderAddress = () => keystone.list('StakeholderAddress');
export const LGA = () => keystone.list('LGA');

export const create = async (req, res) => {
  State()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} States successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const id = req.params.country_id;

  const states = State().model.find();
  if (id) {
    states.where('countryId', id);
  }
  states.exec((err, response) => {
    if (err) return res.status(400).json(err);
    res.sendSuccess(
      {
        data: response,
      },
      200,
    );
  });
};

export const updateMany = (req, res) => {
  req.body.data.forEach((data) => {
    State()
      .model.update(
        { _id: data._id },
        {
          stateName: data.stateName,
          description: data.description,
          countryId: data.countryId,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} State(s) updated successfully`,
        );
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const state = await State().model.findOne({ _id: id });
    if (!state)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'State'),
        404,
      );
    const updatedState = await modelHelper.process(state, req);
    return res.sendSuccess(
      {
        state: updatedState,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'State'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const stateInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('stateId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    stateInModel(StakeholderAddress, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this state. It is already assigned to ${
          results.length
        } stakeholder(s) `;
        errorMessage.push(message);
      }
    }),
    stateInModel(LGA, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this state. It is already assigned to ${
          results.length
        }  Local governement(s)`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      State()
        .model.findByIdAndRemove(id)
        .exec((error, state) => {
          if (!state)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'State'),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'State'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
