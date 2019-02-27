import StakeholderModel from '../../models/resources/stakeholdersDirectory/Stakeholders';

export const addModifyStakeholder = async (basicInformation, options) => {
  // add or modify an existing stakeholder
  let stakeholder;
  if (basicInformation._id !== undefined) {
    // logic for modifying the stakeholder model
    await StakeholderModel.model
      .findOneAndUpdate(
        { _id: basicInformation._id },
        basicInformation,
        options,
      )
      .exec((err, doc) => {
        if (err) {
          throw err;
        } else {
          stakeholder = doc;
        }
      });
  } else {
    // logic for adding a new stakeholder
    await StakeholderModel.model
      .findOne({
        organisationName: basicInformation.organisationName,
      })
      .then(async (query) => {
        // logic for if the stakeholder name already exists
        if (query !== null)
          throw new Error(
            `Stakeholder ${basicInformation.organisationName} already exists`,
          );
        // now create a new stakeholder
        await StakeholderModel.model
          .create(basicInformation)
          .then((doc) => {
            stakeholder = doc;
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        throw e;
      });
  }
  return stakeholder; // return the value of the stakeholder
};
