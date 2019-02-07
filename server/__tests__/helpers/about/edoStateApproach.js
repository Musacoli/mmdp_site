import { faker } from '../commons/base';
import EdoStateApproach from '../../../models/EdoStateApproach';

export const makeEdoStateApproach = (overrides = {}) => {
  return {
    theEdoStateApproach: faker.lorem.paragraph(30),
    background: faker.lorem.sentence(25),
    ...overrides,
  };
};

export const createEdoStateApproach = async (overrides = {}) =>
  EdoStateApproach.model.create(makeEdoStateApproach(overrides));
