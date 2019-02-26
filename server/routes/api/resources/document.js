import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate, getPaginationData } from '../../../utils/search';

export const Document = keystone.list('Document');

export const create = async (req, res) => {
  try {
    const document = new Document.model();
    const newDocument = await modelHelper.process(document, req);
    const message = sprintf(responseMessage.RESOURCE_CREATED, 'document');
    return res.status(201).json({
      message,
      data: { document: newDocument },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { doc } = req;

    const updatedDoc = await modelHelper.process(doc, req);
    const message = sprintf(responseMessage.RESOURCE_UPDATED, 'document');
    return res.status(200).json({
      message,
      data: { document: updatedDoc },
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
    filterAndPaginate(Document, req)
      .sort('-created_at')
      .exec((err, data) => {
        return res.sendSuccess(
          {
            documents: data.results,
            pagination: getPaginationData(data),
          },

          200,

          sprintf(responseMessage.RESOURCE_FETCHED, 'documents'),
        );
      });
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
    const { doc } = req;
    const message = sprintf(responseMessage.RESOURCE_FETCHED, 'document');
    return res.status(200).json({
      message,
      data: { document: doc },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      errMessage,
      error,
    });
  }
};
