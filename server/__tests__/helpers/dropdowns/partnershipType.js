// eslint disable
import keystone from 'keystone';
import { faker } from '../commons/base';

const PartnershipType = keystone.list('PartnershipType');

export const createPartnershipType = async (times = 1) => {
  const states = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    states.push(
      await PartnershipType.model.create({
        partnershipTypeName: faker.random.words(3),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? states[0] : states;
};
