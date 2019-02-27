import keystone from 'keystone';
import { filterAndPaginate, getPaginationData } from '../../utils/search';
import StakeholderModel from '../../models/resources/stakeholdersDirectory/Stakeholders';
import { deleteBeneficiaries } from './addReturneeServicesHelpers';
import {
  fetchAddresses,
  fetchBeneficiaries,
  fetchPartners,
} from './fetchFunctionality';

/** define transaction methods used in transactions */
/** add/modify transactions */
export const handleFetchTransaction = async (req, res) => {
  try {
    filterAndPaginate(StakeholderModel, req)
      .populate('organisationTypeId')
      .populate('impactTypeId')
      .populate('registrationStatusId')
      .populate('staffStrengthRangeId')
      .exec(async (err, data) => {
        if (err) return res.apiError('Database Error', { err });
        await fetchBeneficiaries(data.results);
        await fetchPartners(data.results);
        await fetchAddresses(data.results);

        return res.apiResponse({
          data: data.results,
          pagination: getPaginationData(data),
        });
      });
  } catch (e) {
    res.apiError(e);
  }
};

const deleter = async (Model, query) => {
  await Model.model.deleteMany(query, (err) => {
    if (err) {
      throw err;
    }
  });
};

const switcher = async (Model, stakeholderId) => {
  switch (Model) {
    case 'StakeholderAddress':
      await deleter(keystone.list('StakeholderAddress'), { stakeholderId });
      break;
    case 'StakeholderPartnership':
      // eslint-disable-next-line no-case-declarations
      const model = keystone.list('StakeholderPartnership');
      await deleter(model, {
        stakeholder1Id: stakeholderId,
      });
      await deleter(model, {
        stakeholder2Id: stakeholderId,
      });
      break;
    case 'ReturneeService':
      await deleteBeneficiaries(stakeholderId);
      break;
    default:
  }
};

export const handleDeleteStakeholderDirectoryDependencies = async (
  stakeholderId,
) => {
  const stakeholdersDirectoryDependency = [
    'StakeholderAddress',
    'ReturneeService',
    'StakeholderPartnership',
  ];
  stakeholdersDirectoryDependency.forEach(async (model) => {
    await switcher(model, stakeholderId);
  });
};
