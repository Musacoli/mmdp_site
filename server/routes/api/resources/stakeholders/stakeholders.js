import StakeholderModel from '../../../../models/resources/stakeholdersDirectory/Stakeholders';

import {
  handleDeleteStakeholderDirectoryDependencies,
  handleFetchTransaction,
} from '../../../../helpers/stakeholdersDirectory/stakeholderHelpers';
import {
  editTransaction,
  stripStakeholderPayload,
  transactionRunner,
} from '../../../../helpers/stakeholdersDirectory/manualTransactions';

export const list = async (req, res) => {
  await handleFetchTransaction(req, res);
};

/** ************************************************************************ */
export const create = async (req, res) => {
  const data = stripStakeholderPayload(req.body);

  try {
    const result = await transactionRunner(data);
    return res.apiResponse({
      message: 'New stakeholder Added',
      stakeholder: data,
      result,
    });
  } catch (e) {
    return res.apiError(e.message);
  }
};

/** ************************************************************************ */
export const update = async (req, res) => {
  const id = req.params.id;
  const data = stripStakeholderPayload(req.body);
  data.basicInformation._id = id;
  // fetch stakeholder
  StakeholderModel.model
    .findById(id)
    .lean()
    .then(async (doc) => {
      if (doc === null)
        res.status(404).send({ error: 'stakeholder not found or removed' });
      else {
        try {
          await editTransaction(data).then(() =>
            res.apiResponse({
              message: 'Stakeholder Modified',
            }),
          );
        } catch (e) {
          return res.apiError(e.message);
        }
      }
    })
    .catch((e) => res.apiError(e.message));
};

/** ************************************************************************ */
export const remove = async (req, res) => {
  const id = req.params.id;

  await StakeholderModel.model.findById(id).exec(async (err, item) => {
    if (item === null) {
      return res.apiResponse({
        message: 'The specified stakeholder was not found',
      });
    }

    // delete related entries
    handleDeleteStakeholderDirectoryDependencies(item._id)
      .then(async () => {
        await StakeholderModel.model.deleteOne({ _id: id }, () =>
          res.apiResponse({
            message: 'successfully deleted record',
          }),
        );
      })
      .catch((e) =>
        res.apiError('Database Error while trying to delete the record', {
          error: e.message || e,
        }),
      );
  });
};
/** ************************************************************************ */
