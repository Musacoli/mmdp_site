import StakeholderModel from '../../../../models/resources/stakeholdersDirectory/Stakeholders';
import beneficiaryService from '../../../../models/resources/stakeholdersDirectory/ReturneeService';

export const list = async (req, res) => {
  // find the  stakeholder first
  StakeholderModel.model
    .findById(req.params.stakeholder_id)
    .exec((err, stakeholder) => {
      if (err) return res.apiError('Database Error', { err });
      beneficiaryService.model
        .find()
        .where('stakeholderId', req.params.stakeholder_id)
        .exec((err, results) => {
          if (err) return res.apiError('Database Error', { err });
          res.apiResponse({
            status: 'success',
            data: {
              stakeholder,
              beneficiaries: results,
            },
          });
        });
    });
};
export const update = async (req, res) => {
  beneficiaryService.model
    .findById(req.params.beneficiary_id)
    .exec((err, beneficiary) => {
      if (err) return res.apiError('Database Error', err);
      if (beneficiary === null) {
        return res.apiResponse({
          message: 'The specified Beneficiary was not found',
        });
      }
      beneficiaryService.updateItem(beneficiary, req.body, (err) => {
        if (err) return res.apiError('Database Error', err);
        beneficiaryService.model
          .findById(req.params.beneficiary_id)
          .populate('registrationStatusId')
          .populate('impactTypeID')
          .populate('staffStrengthRangeId')
          .exec((err, updatedBeneficiary) => {
            if (err) return res.apiError('Database Error', err);
            return res.apiResponse({
              message: 'successfully updated beneficiary',
              beneficiary: updatedBeneficiary,
            });
          });
      });
    });
};
export const create = async (req, res) => {
  StakeholderModel.model
    .findById(req.params.stakeholder_id)
    .exec((err, stakeholder) => {
      if (err) return res.apiError('Database Error', err);
      if (stakeholder === null) {
        return res.apiResponse({
          message: 'The specified Stakeholder was not found',
        });
      }
      req.body.stakeholderId = req.params.stakeholder_id;
      const beneficiary = new beneficiaryService.model({
        ...req.body,
      });
      beneficiary.save((err) => {
        if (err) {
          return res.apiError('Database Error', err);
        }
        beneficiaryService.model
          .findOne()
          .where('serviceName', req.body.serviceName)
          .populate('registrationStatusId')
          .populate('impactTypeID')
          .populate('staffStrengthRangeId')
          .exec((err, beneficiary) => {
            if (err) return res.apiError('Database Error', err);
            return res.apiResponse({
              message: 'beneficiary successfully added',
              data: {
                stakeholder,
                beneficiary,
              },
            });
          });
      });
    });
};
export const remove = async (req, res) => {
  beneficiaryService.model
    .findById(req.params.beneficiary_id)
    .exec((err, beneficiary) => {
      if (err) return res.apiError('Database Error', err);
      if (beneficiary === null) {
        return res.apiResponse({
          message: 'The specified Beneficiary was not found',
        });
      }

      beneficiaryService.model
        .deleteOne({ _id: req.params.beneficiary_id })
        .exec((err) => {
          if (err) return res.apiError('Database Error', err);
          return res.apiResponse({
            message: 'successfully deleted record',
          });
        });
    });
};
