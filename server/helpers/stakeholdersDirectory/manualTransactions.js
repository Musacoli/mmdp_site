import _ from 'lodash';
import StakeholderModel from '../../models/resources/stakeholdersDirectory/Stakeholders';
import { handleDeleteStakeholderDirectoryDependencies } from './stakeholderHelpers';
import { addBeneficiaries } from './addReturneeServicesHelpers';
import { editBeneficiary } from './editReturneeServiceHelpers';
import { addModifyStakeholderAddress } from './addModifyAdressData';
import {
  addModifyPartnerships,
  editPartnerships,
} from './addModifyPartnerships';
import { addModifyStakeholder } from './addModifyStakeholderBasicInfo';

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

export const addTransaction = async (payload) => {
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
        data.stakeholderAddress = await addModifyStakeholderAddress(
          data.Stakeholder._id,
          payload.addressData,
          options,
        );
        // now add partnerships
        data.partnerships = await addModifyPartnerships(
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
  const options = {
    upsert: true,
    lean: true,
    omitUndefined: true,
    new: true,
  };
  await addModifyStakeholder(payload.basicInformation, options)
    .then(async () => {
      // update address information data
      await addModifyStakeholderAddress(
        payload.basicInformation._id,
        payload.addressData,
        { upsert: false },
      ).catch((e) => {
        throw e;
      });
    })
    .then(async () => {
      // update partnership information
      await editPartnerships(
        payload.basicInformation._id,
        payload.partnerships,
      );
    }) // update beneficiaries
    .then(async () => {
      await Promise.all(
        payload.beneficiaries.map(async (beneficiary) =>
          editBeneficiary(beneficiary, payload.basicInformation._id, options),
        ),
      ).catch((e) => {
        throw e;
      });
    })
    .catch((e) => {
      throw e;
    });
};
