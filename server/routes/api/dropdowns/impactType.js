/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const ImpactType = () => keystone.list('ImpactType');
export const Stakeholders = () => keystone.list('stakeholders');

export const create = async (req, res) => {
  ImpactType()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} Impact Type successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const impactType = ImpactType().model.find();
  impactType.exec((err, response) => {
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
    ImpactType()
      .model.update(
        { _id: data._id },
        {
          description: data.description,
          impactTypeName: data.impactTypeName,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} Impact Type(s) updated successfully`,
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
    const impactType = await ImpactType().model.findOne({ _id: id });
    if (!impactType)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'Impact-type'),
        404,
      );
    const updatedState = await modelHelper.process(impactType, req);
    return res.sendSuccess(
      {
        impactType: updatedState,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Impact-type'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const ImpactTypesInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('Impact_Type_Id', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    ImpactTypesInModel(Stakeholders, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this Impact Type. It is already assigned to ${
          results.length
        } stakeholder`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      ImpactType()
        .model.findByIdAndRemove(id)
        .exec((error, state) => {
          if (!state)
            return res.sendError(
              sprintf(
                responseMessage.RESOURCE_T0_DELETE_NOT_FOUND,
                'impact type',
              ),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Impact Type'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
