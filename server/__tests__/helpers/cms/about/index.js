import {faker} from "../../base";
import About from '../../../../models/About';

export const makeAbout = (overrides = {}) => {
  return {
    about: faker.lorem.sentence(20),
    background: faker.lorem.paragraph(30),
    ...overrides
  }
};

export const createAbout = async (overrides = {}) => {
  return await About.model.create(makeAbout(overrides));
};
