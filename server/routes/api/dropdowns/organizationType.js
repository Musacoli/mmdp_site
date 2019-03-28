/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';

export const Stakeholder = () => keystone.list('StakeholderAddress');

export const OrganisationType = () => keystone.list('OrganisationType');

export const create = async (req, res) => {
  const { data } = req.body;
  OrganisationType()
    .model.insertMany(data)
    .then((result) =>
      res.status(201).json({
        message: `${data.length} Organization Type(s) successfully added`,
        data: result,
      }),
    )
    .catch((err) =>
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err),
    );
};

export const list = async (req, res) => {
  OrganisationType()
    .model.find()
    .exec((err, results) => {
      if (err) res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
      res.status(200).send({
        data: results,
      });
    });
};

export const update = (req, res) => {
  const { data } = req.body;
  data.forEach((item) => {
    OrganisationType()
      .model.update(
        { _id: item._id },
        {
          typeName: item.typeName,
          description: item.description,
        },
        { upsert: true },
      )
      .then(() =>
        res.status(200).send({
          message: `${data.length} Organization Type(s) updated successfully`,
        }),
      )
      .catch((err) =>
        res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err),
      );
  });
};

export const OrganTypeInModel = (model1, id) => {
  const results = model1.model
    .find()
    .where('', id)
    .lean();
  return results;
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const errorMessage = [];
  Promise.all([
    OrganTypeInModel(Stakeholder(), id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this Organisation Type. It is already assigned to ${
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
      OrganisationType()
        .model.findByIdAndRemove(id)
        // eslint-disable-next-line no-unused-vars
        .exec((error, result) => {
          if (error) {
            return res
              .status(404)
              .send(
                sprintf(
                  responseMessage.RESOURCE_T0_DELETE_NOT_FOUND,
                  'Organization Type',
                ),
              );
          }
          return res.status(202).send({
            message: sprintf(
              responseMessage.RESOURCE_DELETED,
              'Organization Type',
            ),
          });
        });
    } catch (error) {
      res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
