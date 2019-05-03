import _ from 'lodash';
import baseAPI, { server } from '../../keys';
import { formatObjectToParams } from '../../helpers';

/** Define constants for this class */
const URL = `${baseAPI}/api/v1`;

/** define utility functions */
export const searchStakeHoldersDirectory = (actionPayload) => {
  const { payload } = actionPayload;
  return server.get(
    `${URL}/stakeholders-directory?${formatObjectToParams({
      page: payload.page,
      organisationName: payload.searchQuery,
      perPage: 9,
    })}`,
  );
};

export const handleGetValue = (
  obj,
  key = '',
  subKey = '',
  defaultValue = '-',
) => {
  // get values for  nested objects or return a default value
  const primary = obj === undefined ? null : obj[key];
  if (primary !== null && primary !== undefined) {
    const secondary = primary[subKey];
    if (secondary !== undefined) {
      return secondary;
    }
    return primary;
  }
  return defaultValue;
};

export const handleMultipleStrings = (
  key,
  subkey,
  beneficiaries,
  defaultValue = '-',
  arrayId = '',
) => {
  const str = []; // return a comma separated list of values from the stakeholder object
  if (beneficiaries) {
    beneficiaries.forEach((service) => {
      if (arrayId === '') {
        str.push(handleGetValue(service, key, subkey));
      } else {
        const array = service[arrayId];
        array.forEach((value) => {
          str.push(handleGetValue(value, key, subkey));
        });
      }
    });
  }
  const unique = [...new Set(str)];
  if (unique.length > 0) {
    _.pull(unique, '-');
    return _.join(unique);
  }
  return defaultValue;
};

export const handleBeneficiaryGenderDistribution = (
  beneficiaries,
  arrayId = '',
) => {
  let male = 0;
  let female = 0;
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((service) => {
      const array = service[arrayId];
      if (array) {
        array.forEach((val) => {
          male += val.noOfMaleBeneficiaries;
          female += val.noOfFemaleBeneficiaries;
        });
      }
    });
    const total = male + female;
    return `Male:${Math.round((male / total) * 100)}%, Female:${Math.round(
      (female / total) * 100,
    )}%`;
  }
  return '-';
};

export const handleTotals = (key, beneficiaries, arrayId = '') => {
  let total = 0;
  if (beneficiaries) {
    beneficiaries.forEach((service) => {
      if (arrayId !== '') {
        const array = service[arrayId];
        array.forEach((value) => {
          if (value[key]) {
            total += value[key];
          }
        });
      } else if (service[key]) {
        total += service[key];
      }
    });
  }
  return total;
};

export const handleGetPartnerships = (item, type = 'partnerships') => {
  const partners = item.partnerships || [];
  const partnerships1 = [];
  const partnershipTypes = []; // get all partnerships names
  if (partners.length > 0) {
    partners.forEach((partner) => {
      partnerships1.push(partner.stakeholder1Id);
      partnerships1.push(partner.stakeholder2Id);
      partnershipTypes.push(partner.partnershipType);
    });
  } // make sure the components in the arrays are unique
  const uniqueCombinedArray = [...new Set(partnerships1)]; // remove the name of the current organisationName. This will also mutate the array
  _.pull(uniqueCombinedArray, item.organisationName); // return the appropriate data depending on the type selected
  if (type === 'partnerships') return uniqueCombinedArray.join(',');
  return partnershipTypes.join(',');
};

export const handleFocusAreas = (beneficiaries) => {
  const subThemes = [];
  const thematicPillars = [];
  const FocusAreas = [];
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((service) => {
      if (service.focusArea) {
        FocusAreas.push(service.focusArea.focusAreaName);
        subThemes.push(service.focusArea.subThemeName);
        thematicPillars.push(service.focusArea.thematicPillarName);
      }
    });
  }
  const uniqueSubThemes = [...new Set(subThemes)];
  const uniquePillars = [...new Set(thematicPillars)];
  const uniqueFocusAreas = [...new Set(FocusAreas)];
  return [
    _.join(uniqueSubThemes),
    _.join(uniquePillars),
    _.join(uniqueFocusAreas),
  ];
};

export const handleStakeholderAddresses = (item, addressType) => {
  const addressName = []; // return a string representation of the location address
  if (item.adresses) {
    item.adresses.forEach((address) => {
      const value = handleGetValue(address, 'addressType');
      if (value === addressType) {
        addressName.push(handleGetValue(address, 'address'));
      }
    });
  }
  if (addressName.length === 0) {
    return '-';
  }
  return addressName.join(',');
};

export const createStakeholdersAddressObject = (addressData) => {
  const common = {
    countryId: addressData.country,
    stateId: addressData.state,
  };
  const stateAddress = {
    ...common,
    address: addressData.stateOfficeAddress,
    addressType: 'BRANCH',
  };
  const headAddress = {
    ...common,
    address: addressData.headOfficeAddress,
    addressType: 'HOME',
  };
  return [stateAddress, headAddress];
};

export const computeTotalNumberOfBeneficiariesPerService = (
  beneficiaryServiceTypes,
) => {
  let total = 0;
  try {
    beneficiaryServiceTypes.map((type) => {
      total += type.totalNumberOfBeneficiaries;
    });
  } catch (e) {
    return total;
  }
  return total;
};

export const computeTotalNumberOfBeneficiaries = (beneficiaries) => {
  let total = 0;
  try {
    beneficiaries.map((beneficiary) => {
      const beneficiaryTypes = beneficiary.beneficiaryServiceType;
      total += computeTotalNumberOfBeneficiariesPerService(beneficiaryTypes);
    });
  } catch (e) {
    return total;
  }
  return total;
};

export const handleSourceOfFundingData = (fundingSources, amountInvested) =>
  fundingSources.map((source) => ({
    sourceOfFundingId: source,
    amountInvestedRange: amountInvested,
  }));
export const handleOptionsUpdate = (
  prevState,
  currentState,
  key,
  param,
  method,
) => {
  const { formData } = currentState; // update the states options on country change
  if (prevState.formData[key] !== formData[key]) {
    // update state options if state changes
    if (formData[key] === '') {
      method();
    } else {
      const obj = {};
      obj[param] = formData[key];
      method(obj);
    }
  }
};
