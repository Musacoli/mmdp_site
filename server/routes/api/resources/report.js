import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Report = () => keystone.list('Report');

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
