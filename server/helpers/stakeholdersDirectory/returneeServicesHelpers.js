import { returneeService } from './static';

export const addBeneficiaries = async (
  stakeholderId,
  beneficiaries,
  options = {},
) => {
  const addedBeneficiaryServices = [];
  await Promise.all(
    beneficiaries.map(async (beneficiary) => {
      const data = beneficiary;
      data.stakeholderId = stakeholderId;
      const query = await returneeService.findOneAndUpdate(
        {
          stakeholderId,
          serviceName: data.serviceName,
        },
        data,
        options,
      );
      addedBeneficiaryServices.push(query);
    }),
  );
  return addedBeneficiaryServices;
};
