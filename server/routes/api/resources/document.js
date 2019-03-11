import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';
import { filterAndPaginate, getPaginationData } from '../../../utils/search';
import {
  checkArchiveState,
  message,
} from '../../../middleware/repository/archiveHelper';

export const Document = keystone.list('Document');

export const create = async (req, res) => {
  try {
    const document = new Document.model();
    const newDocument = await modelHelper.process(document, req);
    const message = sprintf(responseMessage.RESOURCE_CREATED, 'Document');
    return res.status(201).json({
      status: 'success',
      message,
      data: { document: newDocument },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      status: 'error',
      errMessage,
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { doc } = req;

    const updatedDoc = await modelHelper.process(doc, req);
    const message = sprintf(responseMessage.RESOURCE_UPDATED, 'Document');
    return res.status(200).json({
      status: 'success',
      message,
      data: { document: updatedDoc },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      status: 'error',
      errMessage,
      error,
    });
  }
};

export const list = async (req, res) => {
  try {
    const otherFilters = {};

    // don't show archived documents for unauthenticated users
    if (!req.user) otherFilters.archived = false;

    filterAndPaginate(Document, req, {}, otherFilters)
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
      status: 'error',
      errMessage,
      error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { doc } = req;
    const message = sprintf(responseMessage.RESOURCE_FETCHED, 'Document');
    return res.status(200).json({
      status: 'success',
      message,
      data: { document: doc },
    });
  } catch (error) {
    const errMessage = responseMessage.INTERNAL_SERVER_ERROR;
    return res.status(500).json({
      status: 'error',
      errMessage,
      error,
    });
  }
};

export const archive = async (req, res) => {
  try {
    const archived = await checkArchiveState(req.params.id);

    await Document.model.findByIdAndUpdate(req.params.id, archived);
    return res.status(200).json({
      message: message(archived.archived),
      archived: archived.archived,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await Document.model.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: 'Document deleted successfully',
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
