import keystone from 'keystone';
import { sprintf } from 'sprintf-js';
import modelHelper from '../../../helpers/modelHelper';
import responseMessage from '../../../constants/responseMessage';

const LGABoundary = () => keystone.list('lgaboundary');

export const update = async (req, res) => {
  const { uniqueId } = req.params;
  try {
    const findLGA = await LGABoundary().model.findOne({ uniqueId });
    if (!findLGA) {
      return res.sendError(
        sprintf(responseMessage.RESOURCE_NOT_FOUND, 'LGA ID'),
        404,
      );
    }
    const updateLga = await modelHelper.process(findLGA, req);
    return res.sendSuccess(
      {
        lga: updateLga,
      },
      200,
      sprintf(responseMessage.RESOURCE_UPDATED, 'LGA ID'),
    );
  } catch (error) {
    res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
