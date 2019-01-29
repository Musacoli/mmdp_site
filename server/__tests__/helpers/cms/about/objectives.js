import {faker} from "../../base";
import Objective from '../../../../models/Objectives';

export const makeObjective = (overrides = {}) => {
  return {
    Objectives: faker.lorem.paragraph(25),
    ...overrides
  }
};

export const createObjective = async (overrides = {}) => {
  return await Objective.model.create(makeObjective(overrides));
};
