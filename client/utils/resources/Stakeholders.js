import _ from 'lodash';
import NigerianStates from '../NigerianStates';
import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const URL = `${baseAPI}/api/v1`;

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

export const fetchNigerianStates = () =>
  // iterate through the list and return the name and key
  NigerianStates.map((item) => ({
    key: item.state.id,
    text: item.state.name,
    value: item.state.name,
  }));

export const fetchNigerianStatesLGAs = (states) => {
  // first determine the states for which to return the LGAs
  const SourceList = () => {
    if (states.payload === undefined || states.payload.length === 0) {
      return NigerianStates; // if none are provided return all
    } // else return LGAs for only the selected states
    const temp = [];
    temp.push(states.payload);
    const custom = [];
    temp.forEach((value) => {
      const result = NigerianStates.filter(
        (state) => state.state.name === value,
      );
      custom.push(...result);
    });
    return custom;
  };
  const stateOptions = SourceList().map((item) => {
    const LGAs = item.state.locals;
    return LGAs.map((lga) => ({
      key: lga.id + lga.name,
      text: lga.name,
      value: lga.name,
    }));
  });
  return [].concat(...stateOptions);
};

export const handleGetValue = (obj, key = '', subKey = '') => {
  // get values for  nested objects or return a default value
  const primary = obj[key];
  if (primary !== null && primary !== undefined) {
    const secondary = primary[subKey];
    if (secondary !== null && secondary !== undefined) {
      return secondary;
    }
    return primary;
  }
  return '-';
};

export const handleMultipleStrings = (key, subkey, beneficiaries) => {
  // return a comma separated list of values from the stakeholder object
  const str = [];

  if (beneficiaries) {
    beneficiaries.forEach((service) => {
      str.push(handleGetValue(service, key, subkey));
    });
  }

  const unique = [...new Set(str)];
  if (unique.length > 0) {
    _.pull(unique, '-');
    return _.join(unique);
  }
  return '-';
};

export const handleBeneficiaryGenderDistribution = (beneficiaries) => {
  let male = 0;
  let female = 0;

  if (beneficiaries.length > 0) {
    beneficiaries.forEach((service) => {
      male += service.averageNumberOfMaleBeneficiaries;
      female += service.averageNumberOfFemaleBeneficiaries;
    });

    const total = male + female;
    return `Male:${Math.round((male / total) * 100)}%, Female:${Math.round(
      (female / total) * 100,
    )}%`;
  }
  return '-';
};

export const handleTotals = (key, beneficiaries) => {
  let total = 0;

  if (beneficiaries) {
    beneficiaries.forEach((service) => {
      if (service[key]) {
        total += service[key];
      }
    });
  }

  return total;
};

export const handleGetPartnerships = (item, type = 'partnerships') => {
  const partners = item.partnerships;
  const partnerships1 = [];
  const partneshipTypes = [];
  // get all partnerships names
  if (partners.length > 0) {
    partners.forEach((partner) => {
      partnerships1.push(partner.stakeholder1Id);
      partnerships1.push(partner.stakeholder2Id);
      partneshipTypes.push(partner.partnershipType);
    });
  }
  // make sure the components in the arrays are unique
  const uniqueCombinedArray = [...new Set(partnerships1)];
  // remove the name of the current organisationName. This will also mutate the array
  _.pull(uniqueCombinedArray, item.organisationName);
  // return the appropriate data depending on the type selected
  if (type === 'partnerships') return uniqueCombinedArray.join(',');
  return partneshipTypes.join(',');
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
  // return a string representation of the location address
  const addressName = [];
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
