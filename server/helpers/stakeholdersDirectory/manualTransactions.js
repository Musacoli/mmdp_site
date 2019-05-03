import _ from 'lodash';
import StakeholderModel from '../../models/resources/stakeholdersDirectory/Stakeholders';
import StakeholderAddressModel from '../../models/resources/stakeholdersDirectory/StakeholderAdress';
import PartnershipsModel from '../../models/resources/stakeholdersDirectory/StakeholderPartnership';
import { handleDeleteStakeholderDirectoryDependencies } from './stakeholderHelpers';
import { addBeneficiaries } from './addReturneeServicesHelpers';
import { editBeneficiary } from './editReturneeServiceHelpers';

const getAndDelete = (payload, key) => {
  const record = _.cloneDeep(payload[key]);
  // eslint-disable-next-line no-param-reassign
  delete payload[key];
  return record;
};

const handleTransactionRollBack = async (data) => {
  // handle the stakeholder transaction roll back if it fails
  const stakeholder = data.Stakeholder;
  // delete any record associated with the stakeholder

  if (stakeholder._id !== undefined) {
    await handleDeleteStakeholderDirectoryDependencies(stakeholder._id).then(
      () => {
        StakeholderModel.model.findByIdAndRemove(stakeholder._id).then(() => {
          // eslint-disable-next-line no-console
          console.info('transaction reversed');
        });
      },
    );
  }
};
export const stripStakeholderPayload = (payload) => {
  // breakdown the original payload to the various components consumed by the various manual transactions
  const data = _.cloneDeep(payload); // create  a clone of the dataset
  const addressData = getAndDelete(data, 'stakeholderAddress') || [];
  const beneficiaries = getAndDelete(data, 'beneficiaries') || [];
  const partnerships = getAndDelete(data, 'partnerships') || [];

  return {
    addressData,
    beneficiaries,
    partnerships,
    basicInformation: data,
  };
};

export const stripBeneficiaryPayload = (beneficiary) => {
  // breakdown the original payload to the various components consumed by the various manual transactions
  const data = _.cloneDeep(beneficiary);
  const sourceOfFunding = getAndDelete(data, 'sourceOfFunding');
  const beneficiaryServiceType = getAndDelete(data, 'beneficiaryServiceType');
  const community = getAndDelete(data, 'community');
  return {
    sourceOfFunding,
    beneficiaryServiceType,
    community,
    beneficiaryInformation: data,
  };
};

const addModifyStakeholder = async (basicInformation, options) => {
  // add or modify an existing stakeholder
  let stakeholder;
  if (basicInformation._id !== undefined) {
    // logic for modifying the stakeholder model
    await StakeholderModel.model
      .findOneAndUpdate(
        { _id: basicInformation._id },
        basicInformation,
        options,
      )
      .exec((err, doc) => {
        if (err) {
          throw err;
        } else {
          stakeholder = doc;
        }
      });
  } else {
    // logic for adding a new stakeholder
    await StakeholderModel.model
      .findOne({
        organisationName: basicInformation.organisationName,
      })
      .then(async (query) => {
        // logic for if the stakeholder name already exists
        if (query !== null)
          throw new Error(
            `Stakeholder ${basicInformation.organisationName} already exists`,
          );
        // now create a new stakeholder
        await StakeholderModel.model
          .create(basicInformation)
          .then((doc) => {
            stakeholder = doc;
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        throw e;
      });
  }
  return stakeholder; // return the value of the stakeholder
};

const addStakeholderAddress = async (stakeholderID, addressData, options) => {
  // find one or create if it does not exist
  // addressData is an array with two address. iterate through it creating new entries
  const addresses = [];
  if (stakeholderID) {
    await Promise.all(
      addressData.map(async (address) => {
        const data = address;
        data.stakeholderId = stakeholderID;
        await StakeholderAddressModel.model
          .findOneAndUpdate(
            {
              stakeholderId: data.stakeholderId,
              addressType: data.addressType,
            },
            data,
            options,
          )
          .then((doc) => {
            addresses.push(doc);
          })
          .catch((e) => {
            throw e;
          });
      }),
    ).catch((e) => {
      throw e;
    });
  }
  return addresses;
};

const partnershipQuery = (data) => ({
  $and: [
    {
      $or: [
        { stakeholder1Id: data.stakeholder1Id },
        { stakeholder1Id: data.stakeholder2Id },
      ],
    },
    {
      $or: [
        { stakeholder2Id: data.stakeholder1Id },
        { stakeholder2Id: data.stakeholder2Id },
      ],
    },
  ],
});

const addPartnerships = async (stakeholderID, partnerships = [], options) => {
  const addedPartnerships = [];
  await Promise.all(
    partnerships.map(async (partner) => {
      const data = partner;
      data.stakeholder1Id = stakeholderID;
      await PartnershipsModel.model
        .findOneAndUpdate(partnershipQuery(data), partner, options)
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else addedPartnerships.push(doc);
        });
    }),
  ).catch((e) => {
    throw e;
  });

  return addedPartnerships;
};

export const transactionRunner = async (payload) => {
  const data = {
    Stakeholder: undefined,
    beneficiaries: [],
    stakeholderAddress: [],
    partnerships: [],
  };
  const options = { upsert: true, lean: true, omitUndefined: true, new: true };
  try {
    // start by adding the stakeholder
    await addModifyStakeholder(payload.basicInformation, options).then(
      async (stakeholder) => {
        data.Stakeholder = stakeholder;
        // now add the stakeholders address
        data.stakeholderAddress = await addStakeholderAddress(
          data.Stakeholder._id,
          payload.addressData,
          options,
        );
        // now add partnerships
        data.partnerships = await addPartnerships(
          data.Stakeholder._id,
          payload.partnerships,
          options,
        );
        // add beneficiaries
        data.beneficiaries = await addBeneficiaries(
          data.Stakeholder._id,
          payload.beneficiaries,
          options,
        );
      },
    );

    return data;
  } catch (e) {
    // manually roll back if any error happens during data entry
    if (data.Stakeholder !== undefined) {
      await handleTransactionRollBack(data);
    }
    throw e;
  }
};

export const editTransaction = async (payload) => {
  try {
    const options = {
      upsert: true,
      lean: true,
      omitUndefined: true,
      new: true,
    };
    await addModifyStakeholder(payload.basicInformation, options).then(
      async () => {
        await Promise.all(
          payload.beneficiaries.map(async (beneficiary) => {
            await editBeneficiary(beneficiary);
          }),
        );
      },
    );
  } catch (e) {
    throw e;
  }
};
