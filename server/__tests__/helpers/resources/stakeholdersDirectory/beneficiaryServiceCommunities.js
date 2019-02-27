import keystone from 'keystone';
import { removeAllCollections } from '../../commons/base';
import { createReturneeServices } from './beneficiaries';
import { createCommunity } from '../../dropdowns/communities';
import { createState } from '../../dropdowns/state';
import BeneficiaryServiceCommunity from '../../../../models/resources/stakeholdersDirectory/BeneficiaryServiceCommunity';

const Ward = keystone.list('Ward');

export const createReturneeServiceCommunities = async () => {
  const temp = new Array(1);
  temp.fill(1);
  let beneficiaryCommunities = [];

  let beneficiaryServiceId = '';
  await createReturneeServices().then((res) => {
    beneficiaryServiceId = res._id;
  });

  let wardId;
  let communityId;
  let countryId;
  let stateId;
  let lgaId;

  await createCommunity().then((res) => {
    communityId = res._id;
    wardId = res.wardId;
  });

  await createState().then((res) => {
    stateId = res._id;
    countryId = res.countryId;
  });

  await Ward.model
    .findById(wardId)
    .populate({
      path: 'lgaId',
    })
    .lean()
    .then((res) => {
      lgaId = res.lgaId._id;
    });

  await BeneficiaryServiceCommunity.model
    .create({
      beneficiaryServiceId,
      communityId,
      countryId,
      stateId,
      lgaId,
    })
    .then((res) => {
      beneficiaryCommunities = res;
    });

  return beneficiaryCommunities;
};

export const removeAllReturneeServiceCommunities = async () => {
  const Community = keystone.list('Community');
  const State = keystone.list('State');
  const LGA = keystone.list('LGA');
  const country = keystone.list('Country');
  const models = [
    Ward,
    Community,
    State,
    LGA,
    country,
    BeneficiaryServiceCommunity,
  ];
  await Promise.all(models.map((model) => removeAllCollections(model)));
};
