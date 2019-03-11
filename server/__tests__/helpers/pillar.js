import { faker } from './commons/base';
import Pillar from '../../models/Pillar';

export const makeThematicPillar = (overrides = {}) => {
  return {
    title: faker.lorem.paragraph(20),
    introduction: faker.lorem.paragraph(20),
    whatWeAreDoing: faker.lorem.paragraph(20),
    keyActivities: faker.lorem.paragraph(20),
    ...overrides,
  };
};

export const createThematicPillar = async (overrides = {}) =>
  Pillar.model.create(makeThematicPillar(overrides));
