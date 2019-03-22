/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import Stakeholder from '../../../models/resources/stakeholdersDirectory/Stakeholders';

// export const Stakeholder = () => keystone.List('Stakeholders');
export const RegistrationStatus = () => keystone.list('RegistrationStatus');

export const create = async (req, res) => {
  RegistrationStatus()
    .model.insertMany(req.body.data)
    .then((result) => {
      return res.status(201).json({
        message: `${req.body.data.length} statuses successfully added`,
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
    const status = await RegistrationStatus().model.findById(id);
    if (!status)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Status'),
        404,
      );
    return res.sendSuccess({ status });
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  //   const id = req.params.country_id;

  const statuses = RegistrationStatus().model.find();
  statuses.exec((err, response) => {
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
    RegistrationStatus()
      .model.update(
        { _id: data._id },
        {
          registrationStatus: data.registrationStatus,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        res.sendSuccess(
          '',
          201,
          `${req.body.data.length} status(es) updated successfully`,
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
    const status = await RegistrationStatus().model.findOne({ _id: id });
    if (!status)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'status'),
        404,
      );
    const updatedStatus = await modelHelper.process(status, req);
    return res.sendSuccess(
      {
        status: updatedStatus,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Status'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const statusInModel = (model, id) => {
  const results = model.model
    .find()
    .where('registrationStatusId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    statusInModel(Stakeholder, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this status. It is already assigned to ${
          results.length
        } stakeholder(s) `;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      RegistrationStatus()
        .model.findByIdAndRemove(id)
        .exec((error, status) => {
          if (!status)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'status'),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'Status'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
