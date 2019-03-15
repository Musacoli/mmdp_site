import StakeholderModel from '../../../../models/resources/stakeholdersDirectory/Stakeholders';

import {
  handleCreateUpdateTransaction,
  handleFetchTransaction,
} from '../../../../helpers/stakeholdersDirectory/stakeholderHelpers';

export const list = async (req, res) => {
  await handleFetchTransaction(req, res);
};

/** ************************************************************************ */
export const create = async (req, res) => {
  const address = req.body.stakeholderAddress;
  const partnerships = req.body.partnerships;
  const beneficiaryServices = req.body.returneeServices;

  delete req.body.stakeholderAddress;
  delete req.body.partnerships;
  delete req.body.returneeServices;

  const basicInformation = req.body;
  try {
    const stakeHolder = await handleCreateUpdateTransaction(
      basicInformation,
      address,
      partnerships,
      beneficiaryServices,
    );
    return res.apiResponse({
      message: 'New stakeholder Added',
      stakeholder: stakeHolder,
    });
  } catch (e) {
    return res.apiError(e.message);
  }
};

/** ************************************************************************ */
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

/** ************************************************************************ */
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
/** ************************************************************************ */
