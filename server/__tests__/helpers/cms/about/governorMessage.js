/* eslint-disable  no-return-await */
import { faker } from '../../base';
import GovernorMessage from '../../../../models/GovernorMessage';

export const makeGovernorMessage = (overrides = {}) => {
  return {
    governorName: faker.name.findName(),
    governorMessage: faker.lorem.sentence(),
    ...overrides,
  };
};

export const createGovernorMessage = async (overrides = {}) => {
  return await GovernorMessage.model.create(makeGovernorMessage(overrides));
};
