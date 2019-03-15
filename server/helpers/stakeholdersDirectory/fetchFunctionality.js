/** fetch transactions methods */
import { Partnerships, returneeService, Address } from './static';
import FocusArea from '../../models/dropdowns/FocusArea';
import ThematicPillars from '../../models/dropdowns/ThematicPillarsDropdown';

/** util functions */
const handleFocusArea = async (focusAreaId) => {
  let results = {};
  await FocusArea.model
    .findOne({ _id: focusAreaId })
    .populate('subThemeId')
    .then(async (focusArea) => {
      const response = {
        focusAreaName: focusArea.focusAreaName,
        subThemeName: focusArea.subThemeId.subThemeName,
      };
      await ThematicPillars.model
        .findOne(focusArea.subThemeId.thematicPillarId)
        .then((pillar) => {
          response.thematicPillarName = pillar.pillarName;
          results = response;
        });
    });

  return results;
};

export const fetchBeneficiaries = async (stakeholders = []) => {
  const modifiedStakeholders = [];
  await Promise.all(
    stakeholders.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await returneeService
        .find({ stakeholderId: stakeholder._id })
        .populate('amountInvestedRange')
        .populate('beneficiaryTypeId')
        .populate('targetAudienceId')
        .populate('sourceOfFundingId')
        .populate('ward')
        .populate('community')
        .populate('focusArea')
        .populate('localGovernmentArea')
        .then(async (results) => {
          const modifiedResults = [];
          if (results.length > 0) {
            await Promise.all(
              results.map(async (beneficiary) => {
                const modifiedBeneficiary = beneficiary;
                if (beneficiary._doc.focusArea) {
                  modifiedBeneficiary._doc.focusArea = await handleFocusArea(
                    beneficiary._doc.focusArea._id,
                  );
                }
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

export const fetchPartners = async (stakeholders = []) => {
  const modifiedStakeholders = [];
  await Promise.all(
    stakeholders.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await Partnerships.find()
        .or([
          { stakeholder2Id: stakeholder._id },
          { stakeholder1Id: stakeholder._id },
        ])
        .populate('stakeholder1Id')
        .populate('stakeholder2Id')
        .then((results) => {
          const fetchedPartners = results.map((partner) => {
            let response;
            try {
              response = {
                _id: partner._id,
                stakeholder1Id: partner.stakeholder1Id.organisationName,
                stakeholder2Id: partner.stakeholder2Id.organisationName,
              };
            } catch (e) {
              response = {
                _id: partner._id,
                stakeholder1Id: '',
                stakeholder2Id: '',
              };
            }
            return response;
          });
          modifiedStakeholder._doc.partnerships = fetchedPartners;
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
      await Address.find({ stakeholderId: stakeholder._id })
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
