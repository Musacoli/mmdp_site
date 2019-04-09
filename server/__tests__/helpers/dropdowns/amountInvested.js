// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const amountInvested = keystone.list('AmountInvestedRange');

export const createAmountInvested = async (times = 1) => {
  const investment = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    investment.push(
      await amountInvested.model.create({
        amountInvestedRange: faker.random.words(3),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? investment[0] : investment;
};

export const removeAllFundings = async () => {
  await removeAllCollections(amountInvested);
};
