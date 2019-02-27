import _ from 'lodash';
import ReturneeService from '../../models/resources/stakeholdersDirectory/ReturneeService';
import { stripBeneficiaryPayload } from './manualTransactions';
import BeneficiaryServiceCommunity from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceCommunity';
import BeneficiaryServiceFundingsource from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceFundingsource';
import {
  addBeneficiaries,
  addBeneficiaryServiceType,
  addCommunity,
  addSourceOfFunding,
} from './addReturneeServicesHelpers';
import BeneficiaryServiceTypes from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceType';

export const deleteEntry = async (Model, query) =>
  Model.model
    .deleteOne(query)
    .then((doc) => doc)
    .catch((e) => {
      throw e;
    });

export const listAllEntries = async (Model, query, keys = []) => {
  const entries = [];
  await Model.model.find(query).then((docs) => {
    docs.forEach((doc) => {
      const obj = {};
      obj.id = doc._id;
      // poppulate te object with the required fields
      keys.forEach((key) => {
        obj[key] = doc[key];
      });
      entries.push(obj);
    });
  });
  return entries;
};

const editCommunities = async (communities, query) => {
  const currentCommunities = await listAllEntries(
    BeneficiaryServiceCommunity,
    { beneficiaryServiceId: query._id },
    ['communityId'],
  );
  const newCommunities = [];
  const toBeRemovedCommunities = [];

  // check the community is in current communities and poppulate newCommunities
  _.forEach(communities, (community) => {
    const inCurrent = _.find(currentCommunities, { communityId: community });
    if (inCurrent === undefined) {
      newCommunities.push(community);
    }
  });
  // now poppulate the list with the beneficiaries to be removed
  _.forEach(currentCommunities, (value) => {
    const inCurrent = _.find(communities, value.communityId);
    if (inCurrent === undefined) {
      toBeRemovedCommunities.push(value.id);
    }
  });
  // delete entries removed
  await Promise.all(
    toBeRemovedCommunities.map((community) =>
      deleteEntry(BeneficiaryServiceCommunity, { _id: community }),
    ),
  ).catch((e) => {
    throw e;
  });
  // add any new entries
  await addCommunity(query, newCommunities, { upsert: true }).catch((e) => {
    throw e;
  });
};

const editSourceOfFunding = async (sourceOfFunding, query) => {
  const currentSourcesOfFunding = await listAllEntries(
    BeneficiaryServiceFundingsource,
    { beneficiaryServiceId: query._id },
    ['sourceOfFundingId'],
  );
  const newSources = [];
  const sourcesToBeDeleted = [];

  _.forEach(sourceOfFunding, (source) => {
    const inCurrent = _.find(currentSourcesOfFunding, {
      sourceOfFundingId: source.sourceOfFundingId,
    });
    if (inCurrent === undefined) {
      newSources.push(source);
    }
  });
  _.forEach(currentSourcesOfFunding, (source) => {
    const inUpdate = _.find(sourceOfFunding, {
      sourceOfFundingId: source.sourceOfFundingId,
    });
    if (inUpdate === undefined) {
      sourcesToBeDeleted.push(source.id);
    }
  });
  await Promise.all(
    sourcesToBeDeleted.map((source) =>
      deleteEntry(BeneficiaryServiceFundingsource, { _id: source }),
    ),
  ).catch((e) => {
    throw e;
  });

  await addSourceOfFunding(query, newSources, { upsert: true });
};
const editBeneficiaryServicesTypes = async (beneficiaryServiceTypes, query) => {
  const currentBeneficiaryTypes = await listAllEntries(
    BeneficiaryServiceTypes,
    { beneficiaryServiceId: query._id },
    ['beneficiaryTypeId'],
  );
  const newBeneficiaryTypes = [];
  const deletedBeneficiaryTypes = [];

  _.forEach(beneficiaryServiceTypes, (serviceType) => {
    const inCurrent = _.find(currentBeneficiaryTypes, {
      beneficiaryTypeId: serviceType.beneficiaryTypeId,
    });
    if (inCurrent === undefined) {
      newBeneficiaryTypes.push(serviceType);
    }
  });

  _.forEach(currentBeneficiaryTypes, (serviceType) => {
    const inUpdate = _.find(beneficiaryServiceTypes, {
      beneficiaryTypeId: serviceType.beneficiaryTypeId,
    });
    if (inUpdate === undefined) {
      deletedBeneficiaryTypes.push(serviceType.id);
    }
  });

  await Promise.all(
    deletedBeneficiaryTypes.map((beneficiaryType) =>
      deleteEntry(BeneficiaryServiceTypes, { _id: beneficiaryType }),
    ),
  ).catch((e) => {
    throw e;
  });

  await addBeneficiaryServiceType(query, newBeneficiaryTypes, {
    upsert: true,
  }).catch((e) => {
    throw e;
  });
};

export const editBeneficiary = async (beneficiary, stakeholderId) => {
  const data = stripBeneficiaryPayload(beneficiary);
  const beneficiaryId = data.beneficiaryInformation._id;
  if (beneficiaryId !== null && beneficiaryId !== undefined) {
    try {
      return ReturneeService.model
        .findByIdAndUpdate(
          data.beneficiaryInformation._id,
          data.beneficiaryInformation,
          { upsert: true },
        )
        .then(async (query) => {
          if (query !== null) {
            await Promise.all([
              editCommunities(data.community, query),
              editSourceOfFunding(data.sourceOfFunding, query),
              editBeneficiaryServicesTypes(data.beneficiaryServiceType, query),
            ]).catch((e) => {
              throw e;
            });
          } else {
            throw new Error(
              `Failed to find beneficiary ${
                data.beneficiaryInformation.serviceName
              }`,
            );
          }
        })
        .catch((e) => {
          throw e;
        });
    } catch (e) {
      throw e;
    }
  } else {
    // if a beneficiary id is not provided insert a new beneficiary
    await addBeneficiaries(stakeholderId, [beneficiary], {
      upsert: true,
      new: true,
    }).catch((e) => {
      throw e;
    });
  }
};
