import { faker } from '../commons/base';
import About from '../../../models/about/About';

export const makeAbout = (overrides = {}) => {
  return {
    about: faker.lorem.sentence(20),
    background: faker.lorem.paragraph(30),
    ...overrides,
  };
};

export const createAbout = async (overrides = {}) =>
  About.model.create(makeAbout(overrides));
