import keystone from 'keystone';
import _ from 'lodash';
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
export const itemInModel = async (model, id, field) => {
  const results = await model.model
    .find()
    .where(field, id)
    .lean();
  return results;
};

export const whitelist = [
  {
    partnershiptype: 'PartnershipType',
    field: 'partnershipTypeId',
    records: ['StakeholderAddress', 'StakeholderPartnership'],
  },
  {
    state: 'State',
    field: 'stateId',
    records: ['LGA', 'StakeholderAddress'],
  },
  {
    ward: 'Ward',
    field: 'wardId',
    records: ['Community'],
  },
  {
    lga: 'LGA',
    field: 'lgaId',
    records: ['Ward'],
  },
  {
    community: 'Community',
    field: 'fieldId',
    records: ['ReturneeService'],
  },
  {
    country: 'Country',
    field: 'countryId',
    records: ['State'],
  },
  {
    organizationtype: 'OrganisationType',
    field: 'organizationTypeId',
    records: ['Stakeholder'],
  },
  {
    staffstrengthrange: 'StaffStrengthRange',
    field: 'staffstrengthrangeId',
    records: ['Stakeholder'],
  },
  {
    registrationstatus: 'RegistrationStatus',
    field: 'registrationstatusId',
    records: ['Stakeholder'],
  },
  {
    impacttype: 'ImpactType',
    field: 'impacttypeId',
    records: ['Stakeholder'],
  },
  {
    targetaudience: 'TargetAudience',
    field: 'targetaudienceId',
    records: ['ReturneeService'],
  },
  {
    sourceoffunding: 'SourceOfFunding',
    field: 'sourceoffundingId',
    records: ['ReturneeService'],
  },
  {
    focusarea: 'FocusArea',
    field: 'focusAreaId',
    records: ['ReturneeService'],
  },
  {
    amountinvested: 'AmountInvestedRange',
    field: 'amountInvestedId',
    records: ['ReturneeService'],
  },
  {
    subtheme: 'SubTheme',
    field: 'subThemeId',
    records: ['FocusArea'],
  },
  {
    frequency: 'Frequency',
    field: 'frequencyId',
    records: ['Frequency'],
  },
  {
    thematicpillars: 'ThematicPillarDropdown',
    field: 'thematicPillarId',
    records: ['SubTheme', 'StakeholderAddress'],
  },
  {
    beneficiarytype: 'BeneficiaryType',
    field: 'beneficiatyTypeId',
    records: ['ReturneeService'],
  },
];

export const remove = async (req, res) => {
  const { name } = req.params;

  const modelDetails = _.find(whitelist, (obj) => {
    const keys = Object.keys(obj);
    if (keys[0] === name) {
      return obj;
    }
  });

  if (modelDetails === undefined) {
    return res.status(404).json({
      message: 'The dropdown you are trying to delete does not exist',
    });
  }

  const Model = getModel(modelDetails[name]); // Models to truncate
  const results = await Model.model.find({}); // get a list of all items in the Model

  const referencedItems = []; // items existing in other models that are being referenced
  for (let instance = 0; instance < results.length; instance++) {
    for (let item = 0; item < modelDetails.records.length; item++) {
      // eslint-disable-next-line
      const data = await itemInModel(getModel(modelDetails.records[item]), results[instance]._id, modelDetails.field);
      data.length > 0
        ? referencedItems.push(data) // truncate the model
        : Model.model.remove({ _id: results[instance]._id }).exec();
    }
  }

  return res.status(200).json({
    entries: results.length,
    message: `${results.length -
      referencedItems.length} deleted successfully & ${
      referencedItems.length
    } retained dropdown options in use.`,
  });
};
