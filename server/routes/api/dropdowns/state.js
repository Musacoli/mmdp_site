/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const State = () => keystone.list('State');

export const create = async (req, res) => {
  State()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} states successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const get = async (req, res) => {
  const { id } = req.params;
  try {
    const state = await State().model.findById(id);
    if (!state)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'State'),
        404,
      );
    return res.sendSuccess({ state });
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
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
          `${req.body.data.length} state(s) updated successfully`,
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
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'state'),
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

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const state = await State().model.findByIdAndRemove(id);
    if (!state)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'state'),
        404,
      );
    return res.sendSuccess(
      undefined,
      200,
      sprintf(responseMessage.RESOURCE_DELETED, 'State'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
