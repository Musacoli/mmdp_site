import _ from 'lodash';

const basicInformationData = {
  organisationTypeId: {},
  registrationStatusId: {},
  partnershipData: {},
  partnershipTypes: {},
  impactTypeId: {},
  country: {},
  states: {},
  staffStrengthRangeId: {},
};

const beneficiaryBasicInformationTemplate = {
  targetAudiences: {},
  beneficiaryTypes: {},
  thematicPillars: {},
  fundingSources: {},
  country: {},
  states: {},
  LGAs: {},
  AmountInvestedRange: {},
  focusAreas: {},
  subThemes: {},
  frequencies: {},
};
const beneficiaryData = [];

export const mapStateToOptions = (data, key, value, text) => {
  try {
    return data.map((item) => ({
      key: item[key],
      value: item[value],
      text: item[text],
    }));
  } catch (e) {
    return [];
  }
};

export const handleReduxData = (data, textValue) => {
  try {
    if (data.loading) {
      return {
        loading: true,
        data: [],
      };
    }
    return {
      loading: false,
      data: mapStateToOptions(data.data, '_id', '_id', textValue),
    };
  } catch (e) {
    return {
      loading: true,
      data: [],
    };
  }
};

const handleListStakeholders = (reduxState) => {
  const stakeholdersDirectory = reduxState.stakeholdersDirectory;
  let data;
  try {
    data = stakeholdersDirectory.stakeholders.stakeholders.data;
  } catch (e) {
    data = [];
  }
  const loading = stakeholdersDirectory.stakeholdersLoading;
  if (loading) {
    return {
      loading: true,
      data: [],
    };
  }
  return {
    loading: false,
    data: mapStateToOptions(data, '_id', '_id', 'organisationName'),
  };
};

const handleNestedReduxData = (reduxState, key, textValue) => {
  try {
    const loading = reduxState.isFetching;
    let data;
    try {
      data = reduxState.data[key];
    } catch (e) {
      data = [];
    }
    if (loading) {
      return {
        loading: true,
        data: [],
      };
    }
    return {
      loading: false,
      data: mapStateToOptions(data, '_id', '_id', textValue),
    };
  } catch (e) {
    return {
      loading: true,
      data: [],
    };
  }
};

const handleDropDownData = (name, reduxState, index) => {
  switch (name) {
    case 'organisationTypeId':
      basicInformationData.organisationTypeId = handleReduxData(
        reduxState.ogranizationType,
        'typeName',
      );
      break;
    case 'registrationStatusId':
      basicInformationData.registrationStatusId = handleReduxData(
        reduxState.statuses,
        'registrationStatus',
      );
      break;
    case 'partnershipData':
      basicInformationData.partnershipData = handleListStakeholders(reduxState);
      break;
    case 'partnershipTypes':
      basicInformationData.partnershipTypes = handleReduxData(
        reduxState.partnershipType,
        'partnershipTypeName',
      );
      break;
    case 'impactTypeId':
      basicInformationData.impactTypeId = handleReduxData(
        reduxState.impactTypes,
        'impactTypeName',
      );
      break;
    case 'country':
      if (index >= 0) {
        beneficiaryData[index].country = handleReduxData(
          reduxState.country,
          'countryName',
        );
        break;
      }
      basicInformationData.country = handleReduxData(
        reduxState.country,
        'countryName',
      );
      break;
    case 'staffStrengthRangeId':
      basicInformationData.staffStrengthRangeId = handleNestedReduxData(
        reduxState.staffStrengths,
        'staffStrength',
        'staffStrength',
      );
      break;
    case 'states':
      if (index >= 0) {
        beneficiaryData[index].states = handleReduxData(
          reduxState.states,
          'stateName',
        );
        break;
      }
      basicInformationData.states = handleReduxData(
        reduxState.states,
        'stateName',
      );
      break;
    // beneficiaries drop downs
    case 'targetAudiences':
      beneficiaryData[index].targetAudiences = handleNestedReduxData(
        reduxState.targetAudience,
        'TargetAudiences',
        'audienceType',
      );
      break;
    case 'beneficiaryTypes':
      beneficiaryData[index].beneficiaryTypes = handleReduxData(
        reduxState.beneficiaryTypes,
        'beneficiaryTypeName',
      );
      break;
    case 'thematicPillars':
      beneficiaryData[index].thematicPillars = handleReduxData(
        reduxState.thematicPillars,
        'pillarName',
      );
      break;
    case 'fundingSources':
      beneficiaryData[index].fundingSources = handleReduxData(
        reduxState.funding,
        'sourceOfFundingName',
      );
      break;
    case 'LGAs':
      beneficiaryData[index].LGAs = handleReduxData(reduxState.LGA, 'lgaName');
      break;
    case 'AmountInvestedRange':
      beneficiaryData[index].AmountInvestedRange = handleReduxData(
        reduxState.amountInvested,
        'amountInvestedRange',
      );
      break;
    case 'focusAreas':
      beneficiaryData[index].focusAreas = handleReduxData(
        reduxState.focusArea,
        'focusAreaName',
      );
      break;
    case 'subThemes':
      beneficiaryData[index].subThemes = handleReduxData(
        reduxState.subTheme,
        'subThemeName',
      );
      break;
    case 'frequencies':
      beneficiaryData[index].frequencies = handleReduxData(
        reduxState.frequency,
        'classification',
      );
      break;
    default:
      return [];
  }
};

export const getDropDownData = (reduxState, index) => {
  const keys1 = Object.keys(basicInformationData);
  const keys2 = Object.keys(beneficiaryBasicInformationTemplate);

  if (index >= 0) {
    if (beneficiaryData[index] === undefined) {
      //  make sure there is an associated dropdown template for each index
      beneficiaryData[index] = _.cloneDeep(beneficiaryBasicInformationTemplate);
    }
    keys2.forEach((key) => {
      handleDropDownData(key, reduxState, index);
    });
    return beneficiaryData[index];
  }
  keys1.forEach((key) => {
    handleDropDownData(key, reduxState);
  });
  return basicInformationData;
};
