import modelHelper from '../../helpers/modelHelper';
import responseMessage from '../../constants/responseMessage';

import StakeholderDirectory from '../../models/stakeholdersDirectory';
import BasicInformation from '../../models/stakeholdersDirectory/BasicInformation';
import BeneficiaryService from '../../models/stakeholdersDirectory/BeneficiaryService';

const populateFields = [
  {
    path: 'basicInformation',
  },
  {
    path: 'beneficiaryService',
  },
];

export const create = async (req, res) => {
  try {
    const basicInformation = await modelHelper.process(
      new BasicInformation.model(),
      { ...req, body: req.body.basicInformation || {} },
    );

    const beneficiaryService = await BeneficiaryService.model.insertMany(
      req.body.beneficiaryService || [],
    );

    const stakeholderDirectory = await modelHelper.process(
      new StakeholderDirectory.model(),
      { ...req, body: { basicInformation, beneficiaryService } },
    );

    const data = await modelHelper.populate(
      stakeholderDirectory,
      populateFields,
    );

    return res.sendSuccess(
      data,
      201,
      '"Stakeholder Directory" successfully created!',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const update = async (req, res) => {
  try {
    const stakeholderDirectory = await modelHelper.find(
      StakeholderDirectory.model,
      req.params.id,
    );

    if (!stakeholderDirectory) {
      return res.sendError('Update error', 404, 'Data could not be found');
    }

    const {
      basicInformation: initialBasicInformationID,
    } = stakeholderDirectory;
    const {
      beneficiaryService: initialBeneficiaryServiceIDs,
    } = stakeholderDirectory;
    const { basicInformation: newBasicInformation } = req.body;
    const { beneficiaryService: newBeneficiaryService } = req.body;

    await modelHelper.update(
      BasicInformation.model,
      initialBasicInformationID,
      newBasicInformation,
    );

    await Promise.all(
      initialBeneficiaryServiceIDs.map((id, index) => {
        return modelHelper.update(
          BeneficiaryService.model,
          id,
          newBeneficiaryService[index],
        );
      }),
    );

    if (initialBeneficiaryServiceIDs.length < newBeneficiaryService.length) {
      const createdBeneficiaryService = await BeneficiaryService.model.insertMany(
        newBeneficiaryService.filter((data, index) => {
          return index >= initialBeneficiaryServiceIDs.length;
        }) || [],
      );

      await modelHelper.update(StakeholderDirectory.model, req.params.id, {
        beneficiaryService: [
          ...initialBeneficiaryServiceIDs,
          ...createdBeneficiaryService.map((data) => data._id),
        ],
      });
    }

    await modelHelper.update(StakeholderDirectory.model, req.params.id, {
      updatedAt: new Date(),
    });

    const data = await modelHelper.find(
      StakeholderDirectory.model,
      req.params.id,
      populateFields,
    );

    return res.sendSuccess(
      data,
      200,
      '"Stakeholder Directory" successfully updated!',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const list = async (req, res) => {
  try {
    const stakeholderDirectory = await modelHelper.findAll(
      StakeholderDirectory.model,
      populateFields,
    );

    return res.sendSuccess(
      stakeholderDirectory,
      200,
      '"Stakeholder Directory" successfully retrieved!',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const get = async (req, res) => {
  try {
    const stakeholderDirectory = await modelHelper.find(
      StakeholderDirectory.model,
      req.params.id,
      populateFields,
    );

    if (!stakeholderDirectory) {
      return res.sendError('Retrieval error', 404, 'Data could not be found');
    }

    return res.sendSuccess(
      stakeholderDirectory,
      200,
      '"Stakeholder Directory" successfully retrieved!',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const remove = async (req, res) => {
  try {
    const stakeholderDirectory = await modelHelper.find(
      StakeholderDirectory.model,
      req.params.id,
    );

    if (!stakeholderDirectory) {
      return res.sendError('Deletion error', 404, 'Data could not be found');
    }

    await Promise.all([
      modelHelper.deleteOne(
        BasicInformation.model,
        stakeholderDirectory.basicInformation,
      ),
      modelHelper.deleteMany(
        BeneficiaryService.model,
        stakeholderDirectory.beneficiaryService,
      ),
    ]);

    await modelHelper.deleteOne(
      StakeholderDirectory.model,
      // eslint-disable-next-line no-underscore-dangle
      stakeholderDirectory._id,
    );

    return res.sendSuccess(
      'Deletion successful',
      204,
      '"Stakeholder Directory" successfully deleted!',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
