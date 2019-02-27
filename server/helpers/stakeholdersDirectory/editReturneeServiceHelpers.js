import _ from 'lodash';
import ReturneeService from '../../models/resources/stakeholdersDirectory/ReturneeService';
import { stripBeneficiaryPayload } from './manualTransactions';
import BeneficiaryServiceCommunity from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceCommunity';
import {
  addBeneficiaryServiceType,
  addCommunity,
} from './addReturneeServicesHelpers';
import BeneficiaryServiceTypes from '../../models/resources/stakeholdersDirectory/BeneficiaryServiceType';

const deleteEntry = async (Model, query) =>
  Model.model
    .deleteOne(query)
    .then((doc) => doc)
    .catch((e) => {
      throw e;
    });

const editCommunities = async (communities, query) => {
  await BeneficiaryServiceCommunity.model
    .find({ beneficiaryServiceId: query._id })
    .then(async (results) => {
      // iterate through the array and remove any beneficiary from the database not in the payload other wise add it
      results.forEach(async (result) => {
        const comm = result.communityId;
        const res = _.find(communities, comm);
        if (res === undefined) {
          // if entry has been removed from selection remove it
          await deleteEntry(BeneficiaryServiceCommunity, { _id: result._id });
        }
      });
      // now add  all entries in the communities array not already in the db
      const newCommunities = [];
      Promise.map(
        communities.map(async (community) => {
          await BeneficiaryServiceCommunity.model
            .findOne({
              communityId: community,
              beneficiaryServiceId: query._id,
            })
            .then(async (docs) => {
              if (docs === null) {
                newCommunities.push(community);
              }
            });
        }),
      )
        .then(async () => {
          await addCommunity(query, newCommunities, { upsert: true });
        })
        .catch((e) => {
          throw e;
        });
    })
    .catch((e) => {
      throw e;
    });
};

const editSourceOfFunding = async (sourceOfFunding, query) => {
  const id = { beneficiaryServiceId: query._id };
  const sourceOfFundingModified = sourceOfFunding.map((source) =>
    Object.assign({}, source, id),
  );
  return Promise.all(
    sourceOfFundingModified // add or edit the existing stakeholders
      .map(async (source) =>
        BeneficiaryServiceTypes.model
          .findOneAndUpdate(source, source, { upsert: true })
          .then((doc) => doc)
          .catch((e) => {
            throw e;
          }),
      )
      .then(async () => {
        // delete any source that is not in the current souces list
      }),
  );
};
const editBeneficiaryServicesTypes = async (beneficiaryServiceTypes, query) => {
  await BeneficiaryServiceTypes.model
    .find({ beneficiaryServiceId: query._id })
    .then(async (results) => {
      results.forEach(async (result) => {
        const beneficiaryType = result.beneficiaryTypeId;
        const res = _.find(beneficiaryServiceTypes, {
          beneficiaryTypeId: beneficiaryType,
        });
        if (res === undefined) {
          await deleteEntry(BeneficiaryServiceTypes, {
            beneficiaryServiceId: query._id,
            beneficiaryTypeId: beneficiaryType,
          });
        }
      }); // add any missing entries
      const newBeneficiaryTypes = [];
      await Promise.all(
        beneficiaryServiceTypes.map(async (serviceType) => {
          await BeneficiaryServiceTypes.model
            .findOne({
              beneficiaryServiceId: query._id,
              beneficiaryTypeId: serviceType.beneficiaryTypeId,
            })
            .then((docs) => {
              if (docs === null) {
                const id = { beneficiaryServiceId: query._id };
                newBeneficiaryTypes.push(Object.assign({}, serviceType, id));
              }
            });
        }),
      ).then(async () => {
        await addBeneficiaryServiceType(query, newBeneficiaryTypes, {
          upsert: true,
        });
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const editBeneficiary = async (beneficiary) => {
  const data = stripBeneficiaryPayload(beneficiary);
  try {
    return ReturneeService.model
      .findOneAndUpdate({
        id: data.beneficiaryInformation._id,
      })
      .then(async (query) => {
        await Promise.all([
          editCommunities(data.community, query),
          editSourceOfFunding(data.sourceOfFunding, query),
          editBeneficiaryServicesTypes(data.beneficiaryServiceType, query),
        ]);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
};
