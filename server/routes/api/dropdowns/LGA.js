/* eslint-disable camelcase */
import keystone from 'keystone';
import responseMessage from '../../../constants/responseMessage';

const LGA = () => keystone.list('LGA');
const Ward = () => keystone.list('Ward');

export const create = async (req, res) => {
  const { data } = req.body;
  try {
    LGA()
      .model.insertMany(data)
      .then((result) =>
        res.status(201).json({
          message: `${data.length} Local Government Area(s) successfully added`,
          data: result,
        }),
      );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  LGA()
    .model.find()
    .exec((err, data) => {
      if (err) {
        res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
      }
      return res.status(200).send({ data });
    });
};

export const get = async (req, res) => {
  const { state_id } = req.params;
  LGA()
    .model.find({ stateId: state_id })
    .exec((err, data) => {
      if (err) {
        return res.status(404).send({
          status: 'error',
          message: 'Invalid State Id',
        });
      }
      return res.status(200).send({ data });
    });
};

export const update = async (req, res) => {
  const { data } = req.body;
  data.forEach((item) => {
    LGA()
      .model.update(
        { _id: item._id },
        {
          lgaName: item.lgaName,
          description: item.description,
          stateId: item.stateId,
        },
        { upsert: true },
      )
      .then(() =>
        res.sendSuccess(
          '',
          200,
          `${data.length} Local Goverment Area(s) updated successfully`,
        ),
      )
      .catch((err) => {
        res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
      });
  });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  LGA()
    .model.findById(id)
    .exec((err, item) => {
      if (!item) {
        return res.status(404).send({
          status: 'error',
          message: 'Invalid Object Id',
        });
      }
      const results = Ward()
        .model.find()
        .where('lgaId', id)
        .lean();
      if (results.length > 0) {
        return res.status(400).send({
          message: `You cannot delete this state. It is already assigned to ${
            results.length
          }  Ward(s)`,
        });
      }
      item.remove((err) => {
        if (err) {
          res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, err);
        }
        res.status(202).send({
          status: 'success',
          message: 'Local Goverment Area successfully deleted',
        });
      });
    });
};
