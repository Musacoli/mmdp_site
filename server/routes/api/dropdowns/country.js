/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';

export const Country = () => keystone.list('Country');
export const StakeholderAddress = () => keystone.list('StakeholderAddress');

export const create = async (req, res) => {
  Country()
    .model.insertMany(req.body.data)
    .then((result) => {
      const {
        data: { length },
      } = req.body;
      const count = length > 1 ? `${length} countries ` : '1 country';
      return res.sendSuccess(result, 201, `${count} added successfully`);
    })
    .catch((err) => {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
    });
};

export const list = async (req, res) => {
  const country = Country().model.find();
  country.exec((err, response) => {
    if (err) return res.status(400).json(err);
    res.sendSuccess(
      {
        data: response,
      },
      200,
    );
  });
};

export const get = async (req, res) => {
  const { id } = req.params;
  Country()
    .model.find({ _id: id })
    .exec((err, data) => {
      if (err) {
        return res.status(404).send({
          status: 'error',
          message: 'Invalid Object Id',
        });
      }
      return res.status(200).send({ data });
    });
};

export const updateMany = (req, res) => {
  req.body.data.forEach((data) => {
    Country()
      .model.update(
        { _id: data._id },
        {
          countryName: data.countryName,
          description: data.description,
        },
        { upsert: true },
      )
      .then(() => {
        const {
          data: { length },
        } = req.body;
        const count = length > 1 ? `${length} countries ` : '1 country';
        res.sendSuccess('', 201, `${count}  updated successfully`);
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const stateInModel = (model, id) => {
  const results = model()
    .model.find()
    .where('countryId', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    stateInModel(StakeholderAddress, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this country. It is already assigned to ${
          results.length
        } stakeholder(s)  Address`;
        errorMessage.push(message);
      }
    }),
  ]).then(() => {
    if (errorMessage.length > 0) {
      return res.sendError(errorMessage[0], 400, errorMessage[0]);
    }
    try {
      Country()
        .model.findByIdAndRemove(id)
        .exec((error, country) => {
          if (!country)
            return res.sendError(
              sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'country'),
              404,
            );
          return res.sendSuccess(
            undefined,
            200,
            sprintf(responseMessage.RESOURCE_DELETED, 'country'),
          );
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
