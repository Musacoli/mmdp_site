// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const SourceOfFunding = keystone.list('SourceOfFunding');

export const createFunding = async (times = 1) => {
  const funding = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    funding.push(
      await SourceOfFunding.model.create({
        sourceOfFundingName: faker.random.words(3),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? funding[0] : funding;
};

export const removeAllFundings = async () => {
  await removeAllCollections(SourceOfFunding);
};
