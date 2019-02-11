import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { insertMediaType } from '../../../utils/helpers';

export const Media = keystone.list('Media');

export const create = async (req, res) => {
  req.body.mediaType = insertMediaType(req);
  try {
    const media = new Media.model();
    const newMedia = await modelHelper.process(media, req);
    return res.sendSuccess(
      {
        media: newMedia,
      },
      201,
      sprintf(responseMessage.RESOURCE_CREATED, 'media'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  try {
    Media.model.find((err, media) => {
      return res.sendSuccess(
        { media },
        200,
        sprintf(responseMessage.RESOURCE_FETCH, 'media'),
      );
    });
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const getOne = async (req, res) => {
  try {
    const { med } = req;

    return res.sendSuccess(
      {
        media: med,
      },
      200,
      sprintf(responseMessage.RESOURCE_FETCH, 'media'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
