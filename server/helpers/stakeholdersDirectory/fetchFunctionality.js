/** fetch transactions methods */
import keystone from 'keystone';
import FocusArea from '../../models/dropdowns/FocusArea';
import ThematicPillars from '../../models/dropdowns/ThematicPillarsDropdown';
import returneeService from '../../models/resources/stakeholdersDirectory/ReturneeService';
import Partnerships from '../../models/resources/stakeholdersDirectory/StakeholderPartnership';
import Address from '../../models/resources/stakeholdersDirectory/StakeholderAdress';

/** util functions */
const handleFocusArea = async (focusAreaId) => {
  let results = {};
  await FocusArea.model
    .findOne({ _id: focusAreaId })
    .populate('subThemeId')
    .lean()
    .then(async (focusArea) => {
      const response = {
        _id: focusArea._id,
        focusAreaName: {
          focusAreaName: focusArea.focusAreaName,
          _id: focusArea._id,
        },
        subThemeName: {
          subThemeName: focusArea.subThemeId.subThemeName,
          _id: focusArea.subThemeId._id,
        },
      };
      await ThematicPillars.model
        .findOne(focusArea.subThemeId.thematicPillarId)
        .lean()
        .then((pillar) => {
          response.thematicPillarName = {
            pillarName: pillar.pillarName,
            _id: pillar._id,
          };
          results = response;
        });
    });

  return results;
};

const fetchBeneficiariesData = async (modelName, beneficiaryId) => {
  // take the model name and beneficiary Id and return an object with the array of results
  let results = [];
  const model = keystone.list(modelName);
  await model.model
    .find({ beneficiaryServiceId: beneficiaryId })
    .populate('communityId')
    .populate('countryId')
    .populate('stateId')
    .populate('lgaId')
    .populate('sourceOfFundingId')
    .populate('amountInvestedRange')
    .populate('beneficiaryTypeId')
    .lean()
    .exec((err, data) => {
      if (err) throw new Error(err);
      results = data;
    });
  return results;
};

export const fetchBeneficiaries = async (stakeholders = []) => {
  const modifiedStakeholders = [];
  await Promise.all(
    stakeholders.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await returneeService.model
        .find({ stakeholderId: stakeholder._id })
        .populate('targetAudienceId')
        .populate('focusArea')
        .then(async (results) => {
          const modifiedResults = [];
          if (results.length > 0) {
            await Promise.all(
              results.map(async (beneficiary) => {
                const modifiedBeneficiary = beneficiary; // handle focus area
                if (beneficiary._doc.focusArea) {
                  modifiedBeneficiary._doc.focusArea = await handleFocusArea(
                    beneficiary._doc.focusArea._id,
                  );
                } // fetch meta data
                modifiedBeneficiary._doc.beneficiaryTypes = await fetchBeneficiariesData(
                  'BeneficiaryServiceType',
                  beneficiary._doc._id,
                );
                modifiedBeneficiary._doc.fundingSources = await fetchBeneficiariesData(
                  'BeneficiaryServiceFundingSource',
                  beneficiary._doc._id,
                );
                modifiedBeneficiary._doc.communities = await fetchBeneficiariesData(
                  'BeneficiaryServiceCommunity',
                  beneficiary._doc._id,
                ); // append the results to the results array
                modifiedResults.push(modifiedBeneficiary);
              }),
            );
            modifiedStakeholder._doc.beneficiaries = modifiedResults;
          }
        })
        .catch((e) => {
          throw e;
        });
      modifiedStakeholders.push(modifiedStakeholder);
    }),
  );
  return modifiedStakeholders;
};

const formatResponse = (partner) => {
  try {
    return {
      _id: partner._id,
      stakeholder1Id: {
        organisationName: partner.stakeholder1Id.organisationName,
        _id: partner.stakeholder1Id._id,
      },
      stakeholder2Id: {
        organisationName: partner.stakeholder2Id.organisationName,
        _id: partner.stakeholder2Id._id,
      },
      partnershipType: {
        partnershipTypeName: partner.partnershipTypeId.partnershipTypeName,
        _id: partner.partnershipTypeId._id,
      },
    };
  } catch (e) {
    return {
      _id: partner._id,
      stakeholder1Id: '',
      stakeholder2Id: '',
      partnershipType: '',
    };
  }
};
export const fetchPartners = async (stakeholders = []) => {
  const modifiedStakeholders = [];
  await Promise.all(
    stakeholders.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await Partnerships.model
        .find()
        .or([
          { stakeholder2Id: stakeholder._id },
          { stakeholder1Id: stakeholder._id },
        ])
        .populate('stakeholder1Id')
        .populate('stakeholder2Id')
        .populate('partnershipTypeId')
        .then((results) => {
          modifiedStakeholder._doc.partnerships = results.map((partner) =>
            formatResponse(partner),
          );
        })
        .catch((error) => {
          throw error;
        });
      modifiedStakeholders.push(modifiedStakeholder);
    }),
  );
  return modifiedStakeholders;
};

export const fetchAddresses = async (stakeholders = []) => {
  const modifiedStakeholders = [];
  await Promise.all(
    stakeholders.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await Address.model
        .find({ stakeholderId: stakeholder._id })
        .lean()
        .then((results) => {
          modifiedStakeholder._doc.adresses = results;
        })
        .catch((e) => {
          throw e;
        });
      modifiedStakeholders.push(modifiedStakeholder);
    }),
  );
  return modifiedStakeholders;
};
