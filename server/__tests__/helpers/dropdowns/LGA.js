import keystone from 'keystone';
import { faker } from '../commons/base';

const LGA = keystone.list('LGA');

export const createLGA = async (stateId, times = 1) => {
  const data = {
    lgaName: faker.random.words(3),
    description: faker.random.words(3),
    stateId,
  };
  const localGovernments = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    localGovernments.push(await LGA.model.create(data));
  }
  return times === 1 ? localGovernments[0] : localGovernments;
};

