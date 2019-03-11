import StakeholderModel from '../../../../models/resources/stakeholdersDirectory/Stakeholders';
import beneficiaryService from '../../../../models/resources/stakeholdersDirectory/ReturneeService';
import { filterAndPaginate, getPaginationData } from '../../../../utils/search';

// search functionality for STAKEHOLDERS
const handleBeneficiaryServices = async (data, res) => {
  const response = []; // append beneficiary data
  await Promise.all(
    data.results.map(async (stakeholder) => {
      const modifiedStakeholder = stakeholder;
      await beneficiaryService.model
        .find()
        .where('stakeholderId', stakeholder._id)
        .populate('SourceOfFunding')
        .populate('amountInvestedRange')
        .populate('beneficiaryTypeId')
        .populate('targetAudienceId')
        .exec((err, services) => {
          if (err) return res.apiError('Database Error', { err });
          modifiedStakeholder._doc.beneficiaryService = services;
          response.push(modifiedStakeholder);
        });
    }),
  );
  return response;
};
export const list = async (req, res) => {
  filterAndPaginate(StakeholderModel, req).exec(async (err, data) => {
    if (err) return res.apiError('Database Error', { err });
    const response = await handleBeneficiaryServices(data, res);
    return res.apiResponse({
      data: response,
      pagination: getPaginationData(data),
    });
  });
};

export const create = async (req, res) => {
  try {
    const stakeholder = new StakeholderModel.model({
      ...req.body,
    });

    stakeholder.save((err) => {
      if (err) return res.apiError('Database Error', { err });

      StakeholderModel.model
        .find()
        .where('organisationName', req.body.organisationName)
        .populate('organisationTypeId')
        .populate('registrationStatusId')
        .populate('impactTypeID')
        .populate('staffStrengthRangeId')
        .exec((err, stakeholder) => {
          if (err) return res.apiError('Database Error', err);
          return res.sendSuccess(
            stakeholder,
            201,
            'Stakeholder Directory entry successfully created!',
          );
        });
    });
  } catch (e) {
    if (e) return res.apiError('Database Error', e);
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  let stakeholder = null;
  // fetch stakeholder
  StakeholderModel.model.findById(id).exec((err, item) => {
    if (item === null) {
      return res.apiResponse({
        message: 'The specified stakeholder was not found',
      });
    }
    if (err) return res.apiError('Database Error', { err });
    stakeholder = item;
    // now update
    StakeholderModel.updateItem(stakeholder, req.body, (err) => {
      // handle errors
      if (err) return res.apiError('Database Error', { err });
      // handle success
      StakeholderModel.model.findById(id).exec((err, updated) => {
        // handle errors
        if (err) return res.apiError('Database Error', { err });
        return res.apiResponse({
          message: 'successfully updated',
          stakeholder: updated,
        });
      });
    });
  });
};

export const remove = async (req, res) => {
  const id = req.params.id;

  StakeholderModel.model.findById(id).exec((err, item) => {
    if (item === null) {
      return res.apiResponse({
        message: 'The specified stakeholder was not found',
      });
    }
    if (err) return res.apiError('Database Error', { err });

    StakeholderModel.model.deleteOne({ _id: id }).exec((err) => {
      if (err) return res.apiError('Database Error', { err });
      return res.apiResponse({
        message: 'successfully deleted record',
      });
    });
  });
};
