import {
  handleFocusAreas,
  handleGetPartnerships,
  handleGetValue,
  handleMultipleStrings,
  handleStakeholderAddresses,
  handleTotals,
} from './Stakeholders';

export const mapValuesToStakeholdersSchema = (item, beneficiaries) => {
  const FocusAreas = handleFocusAreas(beneficiaries);
  return {
    'S/N': handleGetValue(item, '_id'),
    'Name of Organization': handleGetValue(item, 'organisationName'),
    'Category / Type': handleGetValue(item, 'organisationTypeId', 'typeName'),
    'Head Office Location/Address': handleStakeholderAddresses(item, 'HOME'),
    'State Office Location/Address': handleStakeholderAddresses(item, 'BRANCH'),
    'Registration Status': handleGetValue(
      item,
      'registrationStatusId',
      'registrationStatus',
    ),
    'Year of Registration': handleGetValue(item, 'yearOfCacREG'),
    'RC Number': handleGetValue(item, 'cacRcNumber'),
    'Number of Staff': handleGetValue(
      item,
      'staffStrengthRangeId',
      'staffStrength',
    ),
    'Volunteers?': typeof handleGetValue(item, 'volunteersCount') === 'number',
    'Number of Volunteers': handleGetValue(item, 'volunteersCount'),
    Partnerships: handleGetPartnerships(item),
    'Partnership Type': handleGetPartnerships(item, 'partnershipType'),
    'Operating in Edo State?':
      handleGetValue(item, 'edoStateOperationStartYear') !== '-',
    'Year Started in Edo State': handleGetValue(
      item,
      'edoStateOperationStartYear',
    ),
    'Willing to partner with Edo State Government?': handleGetValue(
      item,
      'partnerWithGovernment',
    ),
    'Impact Type': handleGetValue(item, 'impactTypeId', 'impactTypeName'),
    'Total Amount Invested': handleTotals('amountInvested', beneficiaries),
    Founder: handleGetValue(item, 'founder'),
    'Phone Number': handleGetValue(item, 'phoneNumber'),
    'Email Address': handleGetValue(item, 'email'),
    'Local Contact Person': handleGetValue(item, 'localManagerName'),
    'Phone number of contact Person': handleGetValue(
      item,
      'localManagerMobile',
    ),
    'Email address of contact person': handleGetValue(
      item,
      'localManagerEmail',
    ),
    Website: handleGetValue(item, 'email'),
    Notes: handleGetValue(item, 'notes'),
    'Name of Service': handleMultipleStrings('serviceName', '', beneficiaries),
    'Target Audience': handleMultipleStrings(
      'beneficiaryTypes',
      'audienceType',
      beneficiaries,
    ),
    'Beneficiary Type(Migrants, displaced persons)': handleMultipleStrings(
      'beneficiaryTypeId',
      'beneficiaryTypeName',
      beneficiaries,
      '-',
      'beneficiaryTypes',
    ),
    'Number of Male Beneficiaries': handleTotals(
      'noOfMaleBeneficiaries',
      beneficiaries,
      'beneficiaryTypes',
    ),
    'Number of Female Beneficiaries': handleTotals(
      'noOfFemaleBeneficiaries',
      beneficiaries,
      'beneficiaryTypes',
    ),
    'Number of Beneficiary': handleTotals(
      'totalNumberOfBeneficiaries',
      beneficiaries,
      'beneficiaryTypes',
    ),
    'Thematic Pillar': FocusAreas[1],
    'Sub Theme': FocusAreas[0],
    'Focus Area': FocusAreas[2],
    'Source of Funding': handleMultipleStrings(
      'sourceOfFundingId',
      'sourceOfFundingName',
      beneficiaries,
      '-',
      'fundingSources',
    ),
    'LGA of operation': handleMultipleStrings(
      'lgaId',
      'lgaName',
      beneficiaries,
      '-',
      'communities',
    ),
    Ward: handleMultipleStrings(
      'communityId',
      'wardId',
      beneficiaries,
      '-',
      'communities',
    ),
    'Local Community': handleMultipleStrings(
      'communityId',
      'communityName',
      beneficiaries,
      '-',
      'communities',
    ),
    'Total number of beneficiaries reached by stakeholder': handleTotals(
      'totalNumberOfBeneficiaries',
      beneficiaries,
    ),
  };
};

export const mapValuesToBeneficiariesSchema = (item) => ({
  'S/N': handleGetValue(item, '_id'),
  'Name of Organization': handleGetValue(item, 'organisationName'),
  'Name of Service': handleGetValue(item, 'serviceName'),
  'Target Audience': handleGetValue(item, 'targetAudienceId', 'audienceType'),
  'Beneficiary Type(Migrants, displaced persons)': handleMultipleStrings(
    'beneficiaryTypeId',
    'beneficiaryTypeName',
    item.beneficiaryTypes,
  ),
  'Number of Male Beneficiaries': handleTotals(
    'noOfMaleBeneficiaries',
    item.beneficiaryTypes,
  ),
  'Number of Female Beneficiaries': handleTotals(
    'noOfFemaleBeneficiaries',
    item.beneficiaryTypes,
  ),
  'Frequency(days)': handleGetValue(item, 'frequency'),
  'Duration(Days)': handleGetValue(item, 'duration'),
  'Number of Beneficiary': handleGetValue(item, 'totalNumberOfBeneficiaries'),
  'Thematic Pillar': handleGetValue(item, 'focusArea', 'thematicPillarName'),
  'Sub Theme': handleGetValue(item, 'focusArea', 'subThemeName'),
  'Focus Area': handleGetValue(item, 'focusArea', 'focusAreaName'),
  'Source of Funding': handleMultipleStrings(
    'sourceOfFundingId',
    'sourceOfFundingName',
    item.fundingSources,
  ),
  'Amount Invested per service': handleMultipleStrings(
    'amountInvestedRange',
    'amountInvestedRange',
    item.fundingSources,
  ),
  'LGA of operation': handleMultipleStrings(
    'lgaId',
    'lgaName',
    item.communities,
  ),
  Ward: handleMultipleStrings('communityId', 'wardId', item.communities),
  'Local Community': handleMultipleStrings(
    'communityId',
    'communityName',
    item.communities,
  ),
  'Total number of beneficiaries reached by stakeholder': handleGetValue(
    item,
    'totalNumberOfBeneficiaries',
  ),
});
