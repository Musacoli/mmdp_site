import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Research = () => keystone.list('Research');

export const create = async (req, res) => {
  const researchItem = new Research().model();
  try {
    const newResearch = await modelHelper.process(researchItem, req);
    const io = keystone.get('io');
    io.sockets.emit('research', newResearch);
    req.session.new = { data: newResearch };
    return res.sendSuccess(
      {
        research: newResearch,
      },
      201,
      sprintf(responseMessage.RESOURCE_CREATED, 'Research'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const retrieve = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      res.status(200).send({
        status: 'success',
        data: item,
      });
    });
};

export const update = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      item.getUpdateHandler(req).process(req.body, (error) => {
        if (error)
          return res.status(400).send({ message: 'update error', error });

        return res.status(200).send({
          message: 'Research Successfully Updated',
          data: item,
        });
      });
    });
};

export const list = async (req, res) => {
  try {
    await Research()
      .paginate({
        page: req.query.page || 1,
        perPage: 12,
        maxPages: 10,
      })
      .sort('')
      .populate('')
      .exec((err, results) => {
        const io = keystone.get('io');
        io.sockets.emit('research', results);
        res.status(200).send({
          data: results,
        });
        req.session.message = { data: results };
      });
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const remove = (req, res) => {
  Research()
    .model.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return res.status(404).send({
          message: 'Research Item Not Found',
        });
      }
      item.remove(() =>
        res.status(204).send({
          message: 'Successfully Deleted',
        }),
      );
    });
};
