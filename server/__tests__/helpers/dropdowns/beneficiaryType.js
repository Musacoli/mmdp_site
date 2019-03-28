import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const BeneficiaryType = keystone.list('BeneficiaryType');

export const createBeneficiaryType = async (times = 1) => {
  const types = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    types.push(
      await BeneficiaryType.model.create({
        beneficiaryTypeName: faker.random.words(7),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? types[0] : types;
};

export const removeAllTypes = async () => {
  await removeAllCollections(BeneficiaryType);
};
