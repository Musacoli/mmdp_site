/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';

export const PartnershipType = () => keystone.list('PartnershipType');
export const StakeholderAddress = () => keystone.list('StakeholderAddress');
export const StakeholderPartnership = () =>
  keystone.list('StakeholderPartnership');

export const create = async (req, res) => {
  PartnershipType()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${
          req.body.data.length
        } Partnership type(s) successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const id = req.params.country_id;

  const types = PartnershipType().model.find();
  if (id) {
    types.where('countryId', id);
  }
  types.exec((err, response) => {
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
    PartnershipType()
      .model.update(
        { _id: data._id },
        {
          partnershipTypeName: data.partnershipTypeName,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} Partnership type(s) updated successfully`,
        );
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const typesInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('partnershipTypeId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    typesInModel(StakeholderPartnership, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this type. It is already assigned to ${
          results.length
        }  stakeholder partnership(s)`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      PartnershipType()
        .model.findByIdAndRemove(id)
        .exec((error, state) => {
          if (!state)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'state'),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'PartnershipType'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
