/* eslint-disable radix */
import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Report = () => keystone.list('Report');
// const MAX_REPORTS_PER_PAGE = 20;
export const create = async (req, res) => {
  const reportItem = new Report().model();
  try {
    const newReport = await modelHelper.process(reportItem, req);
    return res.sendSuccess(
      {
        report: newReport,
      },
      201,
      sprintf(responseMessage.RESOURCE_CREATED, 'Report'),
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const get = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report().model.findById(id);
    if (!report)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'Report'),
        404,
      );
    return res.sendSuccess({ report });
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  const { path } = req.route;
  let filter = { archived: false };
  if (path.endsWith('reports/all')) {
    filter = {};
  }
  try {
    const { offset, limit, page } = modelHelper.getPageInfo(req.query);
    const [total, reports] = await Promise.all([
      Report().model.count(filter),
      modelHelper.paginate(Report().model, filter, { offset, limit }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const meta = {
      currentPage: page + 1,
      perPage: limit,
      totalPages,
      total,
    };
    return res.sendSuccess({ meta, reports });
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report().model.findOne({ _id: id });
    if (!report)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_TO_EDIT_NOT_FOUND, 'report'),
        404,
      );
    const updatedReport = await modelHelper.process(report, req);
    return res.sendSuccess(
      {
        report: updatedReport,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'Report'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const archive = async (req, res) => {
  const { id } = req.params;
  const { path } = req.route;
  let archiveAction;
  let successMessage;
  // order is important as both end with archive
  if (path.endsWith('unarchive')) {
    archiveAction = { archived: false };
    successMessage = sprintf(responseMessage.RESOURCE_UNARCHIVED, 'Report');
  } else if (path.endsWith('archive')) {
    archiveAction = { archived: true };
    successMessage = sprintf(responseMessage.RESOURCE_ARCHIVED, 'Report');
  }
  try {
    const report = await Report().model.findByIdAndUpdate(id, archiveAction, {
      new: true,
    });
    if (!report)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_T0_ARCHIVE_NOT_FOUND, 'report'),
        404,
      );
    return res.sendSuccess({ report }, 200, successMessage);
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report().model.findByIdAndRemove(id);
    if (!report)
      return res.sendError(
        sprintf(responseMessage.RESOURCE_T0_DELETE_NOT_FOUND, 'report'),
        404,
      );
    return res.sendSuccess(
      undefined,
      200,
      sprintf(responseMessage.RESOURCE_DELETED, 'Report'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
