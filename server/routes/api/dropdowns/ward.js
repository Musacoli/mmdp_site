/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Ward = () => keystone.list('Ward');
export const StakeholderAddress = () => keystone.list('StakeholderAddress');
export const Community = () => keystone.list('Community');

export const create = async (req, res) => {
  Ward()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} ward(s) successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const id = req.params.lga_id;

  const wards = Ward().model.find();
  if (id) {
    wards.where('lgaId', id);
  }
  wards.exec((err, response) => {
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
    Ward()
      .model.update(
        { _id: data._id },
        {
          wardName: data.wardName,
          lgaId: data.lgaId,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} ward(s) updated successfully`,
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
    const ward = await Ward().model.findOne({ _id: id });
    if (!ward)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'ward'),
        404,
      );
    const updatedWard = await modelHelper.process(ward, req);
    return res.sendSuccess(
      {
        ward: updatedWard,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'ward'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const wardInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('wardId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    wardInModel(Community, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this ward. It is already assigned to ${
          results.length
        }  Communities`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      Ward()
        .model.findByIdAndRemove(id)
        .exec((error, ward) => {
          if (!ward)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_NONE_EXIST, 'ward'),
              404,
              error,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'ward'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
