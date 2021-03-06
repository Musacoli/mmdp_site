import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import ReturneeService from '../../../models/resources/stakeholdersDirectory/ReturneeService';

export const BeneficiaryType = () => keystone.list('BeneficiaryType');

export const create = async (req, res) => {
  BeneficiaryType()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${
          req.body.data.length
        } beneficiary type(s) successfully added`,
        data: result,
      });
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const types = BeneficiaryType().model.find();

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
    BeneficiaryType()
      .model.update(
        { _id: data._id },
        {
          beneficiaryTypeName: data.beneficiaryTypeName,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} beneficiary type(s) updated successfully`,
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
    const type = await BeneficiaryType().model.findOne({ _id: id });
    if (!type)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'type'),
        404,
      );
    const updatedType = await modelHelper.process(type, req);
    return res.sendSuccess(
      {
        type: updatedType,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'type'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const typeInModel = (model, id) => {
  const results = model.model
    .find()
    .where('beneficiaryTypeId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    typeInModel(ReturneeService, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this beneficiary type. It is already assigned to ${
          results.length
        } returnee service(s) `;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      BeneficiaryType()
        .model.findByIdAndRemove(id)
        .exec((error, type) => {
          if (!type)
            res.sendError(
              sprintf(
                responseMessage.RESOURCE_T0_DELETE_NOT_FOUND,
                'Beneficiary type',
              ),
              404,
            );
          res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Beneficiary type'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
