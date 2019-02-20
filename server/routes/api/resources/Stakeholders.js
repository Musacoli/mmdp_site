import Stakeholders from '../../../models/stakeholdersDirectory/BasicInformation';
import { filterAndPaginate } from '../../../utils/search';

export const list = (req, res) => {
  filterAndPaginate(Stakeholders, req)
    .sort('-stakeholderName')
    .exec((err, results) => {
      res.status(200).send({
        status: 'success',
        data: results,
      });
    });
};
