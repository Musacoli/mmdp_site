import { faker } from '../commons/base';
import Objective from '../../../models/about/Objectives';

export const makeObjective = (overrides = {}) => {
  return {
    Objectives: faker.lorem.paragraph(25),
    ...overrides,
  };
};

export const createObjective = async (overrides = {}) =>
  Objective.model.create(makeObjective(overrides));
