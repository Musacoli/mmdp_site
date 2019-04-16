import keystone from 'keystone';
/**
 *
 * @param {*} name mongoose model name
 * @returns {Model} keystone mongoose model
 */
export const getModel = (name) => keystone.list(name);

/**
 *
 * @param {*} model Keystone mongoose model
 * @param {*} id _id for filter through the model
 * @param {*} field  model field name
 * @returns  {!Array} a list of model collection where item with _id exists
 */

export const data = [
  {
    model: 'RegistrationStatus',
    id: 1,
    title: 'Registration Status',
    route: 'registration-status',
    name: 'registrationstatus',
  },
  {
    model: 'StaffStrengthRange',
    id: 2,
    title: 'Staff Strength',
    route: 'staff-strength',
    name: 'staffstrengthrange',
  },
  {
    model: 'Country',
    id: 3,
    title: 'Countries',
    route: 'country',
    name: 'country',
  },
  {
    model: 'State',
    id: 4,
    title: 'State',
    route: 'state',
    name: 'state',
  },
  {
    model: 'LGA',
    id: 5,
    title: 'Local Government Area',
    route: 'LGA',
    name: 'lga',
  },
  {
    model: 'Ward',
    id: 6,
    title: 'Ward',
    route: 'ward',
    name: 'ward',
  },
  {
    model: 'Community',
    id: 7,
    title: 'Communities',
    route: 'community',
    name: 'community',
  },
  {
    model: 'ThematicPillarDropdown',
    id: 8,
    title: 'Thematic Pillars',
    route: 'thematic-pillars',
    name: 'thematicpillars',
  },
  {
    model: 'BeneficiaryType',
    id: 9,
    title: 'Beneficiary Type',
    route: 'beneficiary-type',
    name: 'beneficiarytype',
  },
  {
    model: 'Frequency',
    id: 10,
    title: 'Frequency',
    route: 'frequency',
    name: 'frequency',
  },
  {
    model: 'AmountInvestedRange',
    id: 11,
    title: 'Amount Invested',
    route: 'amount-invested',
    name: 'amountinvested',
  },
  {
    model: 'SubTheme',
    id: 12,
    title: 'Sub Themes',
    route: 'sub-theme',
    name: 'subtheme',
  },
  {
    model: 'FocusArea',
    id: 13,
    title: 'Focus Area',
    route: 'focus-area',
    name: 'focusarea',
  },
  {
    model: 'TargetAudience',
    id: 14,
    title: 'Target Audience',
    route: 'target-audience',
    name: 'targetaudience',
  },
  {
    model: 'SourceOfFunding',
    id: 15,
    title: 'Source of Funding',
    route: 'funding-source',
    name: 'sourceoffunding',
  },
  {
    model: 'PartnershipType',
    id: 16,
    title: 'Partnership Type',
    route: 'partnership-type',
    name: 'partnershiptype',
  },
  {
    model: 'OrganisationType',
    id: 17,
    title: 'Organization Type',
    route: 'organization-type',
    name: 'organizationtype',
  },
  {
    model: 'ImpactType',
    id: 18,
    title: 'Impact Type',
    route: 'impact-type',
    name: 'impacttype',
  },
];
const getDropdowns = async () => {
  const response = [];

  await Promise.all(
    data.map(async (dropdown) => {
      const modelName = dropdown.model;
      const Model = getModel(modelName);
      const results = await Model.model.find().lean();
      const count = results.length;
      const res = { ...dropdown, count };
      response.push(res);
    }),
  );

  return response;
};
export const list = async (req, res) => {
  await getDropdowns()
    .then((data) => {
      return res.status(200).json({
        message: 'Dropdowns fetched successfully',
        data,
      });
    })
    .catch((err) => {
      res.sendError('failed', 500, err);
    });
};
