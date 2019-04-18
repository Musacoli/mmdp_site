import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../../constants/responseMessage';
import modelHelper from '../../../helpers/modelHelper';

/**
 *
 * @returns {result}
 * @constructor
 */

const Community = () => keystone.list('Community');
export const ReturneeService = () => keystone.list('ReturneeService');
export const communityInModel = (collection, id) => {
  return collection()
    .model.find()
    .where('community', id)
    .lean();
};
export const create = async (req, res) => {
  Community()
    .model.insertMany(req.body.data)
    .then((data) => {
      const {
        data: { length },
      } = req.body;
      const count = length > 1 ? `${length} Communities ` : '1 Community';
      return res
        .status(201)
        .json({
          message: `${count} successfully added`,
          data,
        })
        .catch((error) => {
          res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
        });
    });
};
export const list = async (req, res) => {
  const id = req.params.ward_Id;
  const communities = Community().model.find();
  if (id) {
    communities.where('wardId', id);
  }
  communities.exec((err, data) => {
    if (err) return res.status(400).json(err);
    res.sendSuccess(data, 200);
  });
};
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const remove = async (req, res) => {
  const { id } = req.params;
  const errMsg = [];
  Promise.all([
    communityInModel(ReturneeService, id).then((results) => {
      if (results.length > 0) {
        const message = `You cannot delete this community.It has already been assigned to ${
          results.length
        } Returnee Service(s)`;
        errMsg.push(message);
      }
    }),
  ]).then(() => {
    if (errMsg.length > 0) {
      return res.sendError(errMsg[0], 400, errMsg[0]);
    }
    try {
      Community()
        .model.findByIdAndRemove(id)
        .exec((err, community) => {
          if (!community) {
            return res.status(404).send({
              message: sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Community'),
            });
          }
          return res.status(200).send({
            message: sprintf(responseMessage.RESOURCE_DELETED, 'Community'),
          });
        });
    } catch (error) {
      res.sendSuccess(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
    }
  });
};
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const updateMany = async (req, res) => {
  req.body.data.forEach((data) => {
    const { _id, communityName, description, wardId } = data;
    Community()
      .model.update(
        { _id },
        { communityName, description, wardId },
        { upsert: true },
      )
      .then(() => {
        const {
          data: { length },
        } = req.body;
        const count = length > 1 ? `${length} Communities ` : '1 community';
        res.sendSuccess('', 201, `${count} updated successfully`);
      })
      .catch((err) => {
        res.sendError('failed', 500, err);
      });
  });
};

export const update = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const community = await Community().model.findOne({ _id });
    if (!community) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Community'),
        404,
      );
    }
    const updatedCommunity = await modelHelper.process(community, req);
    return res.sendSuccess(
      {
        community: updatedCommunity,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Community'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
