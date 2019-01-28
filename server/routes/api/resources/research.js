import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

export const Research = () => (keystone.list('Research'));

export const create = async (req, res) => {
  const researchItem = new Research().model();
  try {
    const newResearch = await modelHelper.process(researchItem, req);
    console.log(newResearch);
    return res.sendSuccess({
      research: newResearch,
    }, 201, sprintf(responseMessage.RESOURCE_CREATED, 'Research'));
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
