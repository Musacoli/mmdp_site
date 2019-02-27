import _ from 'lodash';
import { handleGetValue } from './Stakeholders';
import {
  basicInformationTemplate,
  beneficiaryInformationTemplate,
  beneficiaryTypeTemplate,
  partnershipItemTemplate,
  stakeholderAddressItemTemplate,
} from './staticFields';

const handleBeneficiaryServiceType = (beneficiaryTypes) =>
  beneficiaryTypes.map((beneficiaryType) => {
    const template = _.cloneDeep(beneficiaryTypeTemplate);
    template.beneficiaryTypeId = handleGetValue(
      beneficiaryType,
      'beneficiaryTypeId',
      '_id',
      '',
    );
    template.noOfFemaleBeneficiaries = handleGetValue(
      beneficiaryType,
      'noOfFemaleBeneficiaries',
      '',
      0,
    );
    template.noOfMaleBeneficiaries = handleGetValue(
      beneficiaryType,
      'noOfMaleBeneficiaries',
      '',
      0,
    );
    template.totalNumberOfBeneficiaries = handleGetValue(
      beneficiaryType,
      'totalNumberOfBeneficiaries',
      '',
      0,
    );
    return template;
  });

const handleBeneficiaryCommunity = (beneficiaryCommunities) => {
  let country = '';
  let state = '';
  const lga = [];
  const communities = [];
  const ward = [];
  beneficiaryCommunities.map((community) => {
    country = handleGetValue(community, 'countryId', '_id', '');
    state = handleGetValue(community, 'stateId', '_id', '');
    lga.push(handleGetValue(community, 'lgaId', '_id', ''));
    communities.push(handleGetValue(community, 'communityId', '_id', ''));
    ward.push(handleGetValue(community, 'communityId', 'wardId', ''));
  });
  return {
    country,
    state,
    lga: _.uniq(lga),
    communities: _.uniq(communities),
    ward: _.uniq(ward),
  };
};

const handleSourcesOfFunding = (fundingSources) => {
  let amountInvestedRange = '';
  const sourcesOfFunding = [];
  fundingSources.forEach((source) => {
    amountInvestedRange = handleGetValue(
      source,
      'amountInvestedRange',
      '_id',
      '',
    );
    sourcesOfFunding.push(
      handleGetValue(source, 'sourceOfFundingId', '_id', ''),
    );
  });
  return {
    amountInvestedRange,
    sourcesOfFunding,
  };
};

const handleBeneficiariesData = (beneficiaries) =>
  beneficiaries.map((beneficiary) => {
    const data = _.cloneDeep(beneficiaryInformationTemplate);
    const funding = handleSourcesOfFunding(
      handleGetValue(beneficiary, 'fundingSources', '', ''),
    );
    data._id = handleGetValue(beneficiary, '_id', '', '');
    data.sourceOfFunding = funding.sourcesOfFunding;
    data.amountInvestedRange = funding.amountInvestedRange;
    data.beneficiaryServiceType = handleBeneficiaryServiceType(
      handleGetValue(beneficiary, 'beneficiaryTypes', '', []),
    );
    const communities = handleBeneficiaryCommunity(
      handleGetValue(beneficiary, 'communities', ',', []),
    );
    data.community = communities.communities;
    data.country = communities.country;
    data.state = communities.state;
    data.localGovernmentArea = communities.lga;
    data.ward = communities.ward;
    data.duration = handleGetValue(beneficiary, 'duration', '', '');
    data.focusArea = handleGetValue(beneficiary, 'focusArea', '_id', '');
    data.frequency = handleGetValue(beneficiary, 'frequency', '', '');
    data.note = handleGetValue(beneficiary, 'note', '', '');
    data.serviceName = handleGetValue(beneficiary, 'serviceName', '', '');
    data.subTheme = handleGetValue(
      beneficiary.focusArea,
      'subThemeName',
      '_id',
      '',
    );
    data.ward = [];
    data.targetAudienceId = handleGetValue(
      beneficiary,
      'targetAudienceId',
      '_id',
      '',
    );
    data.thematicPillars = handleGetValue(
      beneficiary.focusArea,
      'thematicPillarName',
      '_id',
      '',
    );
    data.totalNumberOfBeneficiaries = 0;
    return data;
  });

const handleAddressData = (addressData) => {
  const template = _.cloneDeep(stakeholderAddressItemTemplate);
  addressData.map((item) => {
    if (item.addressType === 'BRANCH') {
      template.stateOfficeAddress = item.address;
      template.state = item.stateId;
      template.country = item.countryId;
    } else {
      template.headOfficeAddress = item.address;
    }
  });
  return template;
};

const handlePartnerships = (partnerships) =>
  partnerships.map((partner) => {
    const temp = _.cloneDeep(partnershipItemTemplate);
    temp.partnershipTypeId = handleGetValue(
      partner,
      'partnershipType',
      '_id',
      '',
    );
    temp.stakeholder2Id = handleGetValue(partner, 'stakeholder2Id', '_id', '');
    return temp;
  });

const handleBasicInformation = (stakeholder) => {
  const item = _.cloneDeep(stakeholder);
  const data = _.cloneDeep(basicInformationTemplate);
  data._id = handleGetValue(item, '_id', '', '');
  data.organisationName = handleGetValue(item, 'organisationName', '', '');
  data.beneficiaries = handleBeneficiariesData(
    handleGetValue(item, 'beneficiaries', '', []),
  );
  data.cacRcNumber = handleGetValue(item, 'cacRcNumber', '', '');
  data.email = handleGetValue(item, 'email', '', '');
  data.founder = handleGetValue(item, 'founder', '', '');
  data.impactTypeId = handleGetValue(item, 'impactTypeId', '_id', '');
  data.localManagerEmail = handleGetValue(item, 'localManagerEmail', '', '');
  data.localManagerMobile = handleGetValue(item, 'localManagerMobile', '', '');
  data.localManagerName = handleGetValue(item, 'localManagerName', '', '');
  data.notes = handleGetValue(item, 'notes', '', '');
  data.partnerships = handlePartnerships(
    handleGetValue(item, 'partnerships', '', []),
  );
  data.organisationTypeId = handleGetValue(
    item,
    'organisationTypeId',
    '_id',
    '',
  );
  data.partnerWithGovernment = handleGetValue(
    item,
    'partnerWithGovernment',
    '',
    '',
  );
  data.phoneNumber = handleGetValue(item, 'phoneNumber', '', '');
  data.phoneNumber2 = handleGetValue(item, 'phoneNumber2', '', '');
  data.phoneNumber3 = handleGetValue(item, 'phoneNumber3', '', '');
  data.registrationStatusId = handleGetValue(
    item,
    'registrationStatusId',
    '_id',
    '',
  );
  data.staffStrengthRangeId = handleGetValue(
    item,
    'staffStrengthRangeId',
    '_id',
    '',
  );
  data.volunteersCount = handleGetValue(item, 'volunteersCount', '', '');
  data.website = handleGetValue(item, 'website', '', '');
  data.yearOfCacREG = handleGetValue(item, 'yearOfCacREG', '', '');
  return data;
};

export const mapStakeholderDataToBeneficiaryTemplate = (reduxState, params) => {
  let stakeHolder;
  try {
    const stakeHolders =
      reduxState.stakeholdersDirectory.stakeholders.stakeholders.data;
    stakeHolder = _.find(stakeHolders, { organisationName: params.id });
    return {
      stakeholderData: handleBasicInformation(stakeHolder),
      stakeholderAddressItem: handleAddressData(
        handleGetValue(stakeHolder, 'adresses', '', []),
      ),
    };
  } catch (e) {
    stakeHolder = {};
  }
  return stakeHolder;
};
