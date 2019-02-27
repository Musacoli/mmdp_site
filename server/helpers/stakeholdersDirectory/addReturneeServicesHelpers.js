import Community from '../../models/dropdowns/Community';
import ReturneeService from '../../models/resources/stakeholdersDirectory/ReturneeService';
import BeneficiaryServiceCommunity from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceCommunity';
import BeneficiaryServiceFundingSource from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceFundingsource';
import BeneficiaryServiceTypes from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceType';
import { stripBeneficiaryPayload } from './manualTransactions';

/** define static objects for queries */
export const communityDataQuery = {
  path: 'wardId',
  model: 'Ward',
  populate: {
    path: 'lgaId',
    model: 'LGA',
    populate: {
      path: 'stateId',
      model: 'State',
    },
  },
};

/**  methods for querying  the database */
export const addCommunity = async (query, communities, options) => {
  const BeneficiaryCommunityServiceData = [];
  let data = [];

  await Promise.all(
    // populate the beneficiaries services data array
    communities.map(async (community) => {
      const current = {
        beneficiaryServiceId: query._id,
        communityId: community,
        countryId: '',
        stateId: '',
        lgaId: '',
      };
      // fetch data and populate the object
      await Community.model
        .findById(community)
        .populate(communityDataQuery)
        .lean()
        .exec(async (err, data) => {
          if (err) {
            throw err;
          } else if (data == null) {
            throw new Error(
              'Partial update successful.A specified community specified community was not found',
            );
          } else {
            current.countryId = data.wardId.lgaId.stateId.countryId;
            current.stateId = data.wardId.lgaId.stateId._id;
            current.lgaId = data.wardId.lgaId._id;
            BeneficiaryCommunityServiceData.push(current);
          }
        })
        .catch((e) => {
          throw e;
        });
    }),
  );
  // bulk insert the beneficiary service community model
  await BeneficiaryServiceCommunity.model
    .insertMany(BeneficiaryCommunityServiceData, options)
    .then((docs) => {
      data = docs;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};

export const addSourceOfFunding = async (query, sourceOfFunding, options) => {
  const id = { beneficiaryServiceId: query._id };
  let data = [];
  const sourceOfFundingModified = sourceOfFunding.map((source) =>
    Object.assign({}, source, id),
  );
  await BeneficiaryServiceFundingSource.model
    .insertMany(sourceOfFundingModified, options)
    .then((docs) => {
      data = docs;
    })
    .catch((e) => {
      throw e;
    });

  return data;
};
export const addBeneficiaryServiceType = async (
  query,
  beneficiaryServices,
  options,
) => {
  const id = { beneficiaryServiceId: query._id || query };
  let data = [];
  const beneficiaryServicesModified = beneficiaryServices.map((beneficiary) =>
    Object.assign({}, beneficiary, id),
  );
  await BeneficiaryServiceTypes.model
    .insertMany(beneficiaryServicesModified, options)
    .then((docs) => {
      data = docs;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};

export const addBeneficiaries = async (
  stakeholderId,
  beneficiaries,
  options = {},
) => {
  const addedBeneficiaryServices = []; // await all promises to resolve
  return Promise.all(
    // resolve all promises for all beneficiaries submitted
    beneficiaries.map(async (beneficiary) => {
      const data = stripBeneficiaryPayload(beneficiary);
      data.beneficiaryInformation.stakeholderId = stakeholderId; // now update the stakeholder Id
      let query = {};
      const searchQuery = {
        stakeholderId,
        serviceName: data.beneficiaryInformation.serviceName,
      };
      await ReturneeService.model
        .findOneAndUpdate(searchQuery, data.beneficiaryInformation, options)
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else {
            query = doc;
          }
        }); // resolve all this promises
      await Promise.all([
        addBeneficiaryServiceType(query, data.beneficiaryServiceType, options),
        addCommunity(query, data.community, options),
        addSourceOfFunding(query, data.sourceOfFunding, options),
      ])
        .then(() => {
          addedBeneficiaryServices.push(query);
        })
        .catch((error) => {
          throw error;
        });
    }),
  )
    .then(() => addedBeneficiaryServices)
    .catch((error) => {
      throw error;
    });
};

const removeBeneficiaryServiceDependency = async (
  beneficiaryServiceId,
  Model,
) => {
  await Model.model.deleteMany({ beneficiaryServiceId }, async (error) => {
    if (error) {
      throw error;
    } else {
      await Model.model.find({ beneficiaryServiceId }).exec(() => {});
    }
  });
};

export const deleteBeneficiaries = async (stakeholderId) => {
  const beneficiaries = await ReturneeService.model.find({ stakeholderId });
  try {
    await Promise.all(
      beneficiaries.map(async (beneficiary) =>
        Promise.all([
          removeBeneficiaryServiceDependency(
            beneficiary._id,
            BeneficiaryServiceCommunity,
          ),
          removeBeneficiaryServiceDependency(
            beneficiary._id,
            BeneficiaryServiceFundingSource,
          ),
          removeBeneficiaryServiceDependency(
            beneficiary._id,
            BeneficiaryServiceTypes,
          ),
        ]).catch((e) => {
          throw e;
        }),
      ),
    ).then(async () => {
      await ReturneeService.model.findOneAndRemove({ stakeholderId }, () => {});
    });
  } catch (e) {
    throw new Error(e);
  }
};
