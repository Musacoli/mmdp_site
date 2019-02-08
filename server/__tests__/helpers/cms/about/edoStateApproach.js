/* eslint-disable no-return-await */
import { faker } from '../../base';
import EdoStateApproach from '../../../../models/EdoStateApproach';

export const makeEdoStateApproach = (overrides = {}) => {
  return {
    theEdoStateApproach: faker.lorem.paragraph(30),
    background: faker.lorem.sentence(25),
    ...overrides,
  };
};

export const createEdoStateApproach = async (overrides = {}) => {
  return await EdoStateApproach.model.create(makeEdoStateApproach(overrides));
};
