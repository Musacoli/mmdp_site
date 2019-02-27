import StakeholderAddressModel from '../../models/resources/stakeholdersDirectory/StakeholderAdress';

export const addModifyStakeholderAddress = async (
  stakeholderID,
  addressData,
  options,
) => {
  // find one or create if it does not exist
  // addressData is an array with two address. iterate through it creating new entries
  const addresses = [];
  if (stakeholderID) {
    await Promise.all(
      addressData.map(async (address) => {
        const data = address;
        data.stakeholderId = stakeholderID;
        await StakeholderAddressModel.model
          .findOneAndUpdate(
            {
              stakeholderId: data.stakeholderId,
              addressType: data.addressType,
            },
            data,
            options,
          )
          .then((doc) => {
            addresses.push(doc);
          })
          .catch((e) => {
            throw e;
          });
      }),
    ).catch((e) => {
      throw e;
    });
  }
  return addresses;
};
