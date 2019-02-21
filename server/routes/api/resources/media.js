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
    const message = sprintf(responseMessage.RESOURCE_CREATED, 'media');
    return res.status(201).json({
      message,
      data: { media: newMedia },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};

export const list = async (req, res) => {
  try {
    Media.model
      .find((err, media) => {
        const message = sprintf(responseMessage.RESOURCE_FETCHED, 'media');
        return res.status(200).json({
          message,
          data: { media },
        });
      })
      .sort({ created_at: 'descending' });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { med } = req;
    const message = sprintf(responseMessage.RESOURCE_FETCHED, 'media');
    return res.status(200).json({
      message,
      data: { media: med },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { med } = req;
    Media.model.findByIdAndRemove(med.id, (err, deleted) => {
      const message = sprintf(responseMessage.RESOURCE_DELETED, 'media');
      return res.status(200).json({
        message,
        data: { deleted },
      });
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};
