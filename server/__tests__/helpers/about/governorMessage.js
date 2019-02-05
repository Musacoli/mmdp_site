import {faker} from "../commons/base";
import GovernorMessage from '../../../models/GovernorMessage';

export const makeGovernorMessage = (overrides = {}) => {
  return {
    governorName: faker.name.findName(),
    governorMessage:  faker.lorem.paragraph(20),
    ...overrides
  }
};

export const createGovernorMessage = async (overrides = {}) => {
  return await GovernorMessage.model.create(makeGovernorMessage(overrides));
};
