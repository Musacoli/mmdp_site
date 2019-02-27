import _ from 'lodash';
import toastr from 'toastr';
import {
  createStakeholdersAddressObject,
  handleSourceOfFundingData,
} from './Stakeholders';
import { additionalBeneficiaryInformationFields } from './staticFields';

export const requiredBeneficiaryFieldsTemplate = [
  'serviceName',
  'focusArea',
  'beneficiaryServiceType',
  'localGovernmentArea',
  'community',
  'thematicPillars',
  'subTheme',
  'country',
  'state',
  'targetAudienceId',
];

export const validateRequiredFields = (data, requiredFields) => {
  // get a list of all object keys
  const keys = Object.keys(data);
  // record a list of all fields missing data
  const missingFields = [];
  keys.forEach((key) => {
    // check that the field is a required one
    if (_.includes(requiredFields, key)) {
      // check that the data Property is Populated
      const value = data[key];
      // if the value is of type string
      if (typeof value === 'string') {
        if (value === '') {
          missingFields.push(key);
        } // if value is an array instead
      } else if (Array.isArray(value)) {
        // check that array is not empty
        if (value.length === 0) {
          missingFields.push(key);
        }
      }
    }
  });
  return missingFields;
};

export const removeEmptyFields = (data) => {
  // a function to ensure all empty fields are removed from the data set before submit
  const keys = Object.keys(data);
  const temp = _.cloneDeep(data);

  keys.forEach((key) => {
    const value = data[key];
    if (typeof value === 'string') {
      if (value === '') {
        delete temp[key];
      }
    }
  });

  return temp;
};

export const removeNonEssentialFields = (data, nonEssentialFields) => {
  const keys = Object.keys(data);
  const temp = _.cloneDeep(data);

  keys.forEach((key) => {
    if (_.includes(nonEssentialFields, key)) {
      delete temp[key];
    }
  });

  return temp;
};

export const handleFormValidation = async (state) => {
  const {
    stakeholderData,
    requireStakeholderFields,
    requiredBeneficiaryFields,
    step,
  } = state;
  let data;
  let requireFields;

  if (step === 1) {
    data = stakeholderData;
    requireFields = requireStakeholderFields;
  } else {
    data = stakeholderData.beneficiaries[step - 2] || {};
    requireFields = requiredBeneficiaryFields;
  }
  const missingFields = validateRequiredFields(data, requireFields);
  const invalidCount = missingFields.length;

  if (invalidCount > 0) {
    toastr.warning(
      missingFields.join(' ,'),
      `${invalidCount} of the required fields have not been filled`,
    );
    return true;
  }
  if (invalidCount === 0) return false;
};

export const preSubmitValidationAndCleanup = (payload, stakeholderAddress) => {
  // prepare the data before submitting it
  let data = _.cloneDeep(payload);
  try {
    // debugger;
    data.beneficiaries = data.beneficiaries.map((beneficiary) => {
      // handle source of funding object
      const temp = beneficiary;
      temp.sourceOfFunding = handleSourceOfFundingData(
        beneficiary.sourceOfFunding,
        beneficiary.amountInvestedRange,
      );
      return temp;
    });
    // handle stakeholder data
    data.stakeholderAddress = createStakeholdersAddressObject(
      stakeholderAddress,
    );
    // 1. remove any empty fields from the payload text fields
    data = removeEmptyFields(data);
    // validate beneficiaries data
    data.beneficiaries = data.beneficiaries.map((beneficiary) => {
      let temp;
      temp = removeEmptyFields(beneficiary);
      // 2. remove any fields that are not required in the final payload
      temp = removeNonEssentialFields(
        temp,
        Object.keys(additionalBeneficiaryInformationFields),
      );

      // 3. handle any missing fields from the dataset
      const missing = validateRequiredFields(
        beneficiary,
        requiredBeneficiaryFieldsTemplate,
      );
      if (missing.length > 0) {
        toastr.warning(
          missing.join(' ,'),
          `${
            missing.length
          } of the required fields have not been filled.beneficiary removed`,
        );
        return {};
      }
      return temp;
    });
    return data;
  } catch (e) {
    toastr.warning('error preparing the data for submission');
  }
};
