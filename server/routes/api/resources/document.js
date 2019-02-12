import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Document = keystone.list('Document');

export const create = async (req, res) => {
  try {
    const document = new Document.model();
    const newDocument = await modelHelper.process(document, req);
    return res.sendSuccess(
      {
        document: newDocument,
      },
      201,
      sprintf(responseMessage.RESOURCE_CREATED, 'document'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const update = async (req, res) => {
  try {
    const { doc } = req;

    const updatedDoc = await modelHelper.process(doc, req);

    return res.sendSuccess(
      {
        document: updatedDoc,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'document'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  try {
    Document.model.find((err, documents) => {
      return res.sendSuccess(
        { documents },
        200,
        sprintf(responseMessage.RESOURCE_FETCHED, 'documents'),
      );
    });
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const getOne = async (req, res) => {
  try {
    const { doc } = req;

    return res.sendSuccess(
      {
        document: doc,
      },
      200,
      sprintf(responseMessage.RESOURCE_FETCH, 'document'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
