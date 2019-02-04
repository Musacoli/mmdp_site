/* eslint-disable no-underscore-dangle */
import Coordination from '../../../models/Coordination';
import Highlight from '../../../models/Highlight';
import { faker, createUser } from '../commons/base';

export const makeHighlight = (overrides = {}) => {
  return {
    name: faker.lorem.sentence(15),
    ...overrides,
  };
};

export const createHighlight = async (overrides = {}) =>
  Highlight.model.create(makeHighlight(overrides));

export const makeCoordination = async (overrides = {}) => {
  const user = await createUser();
  const highlight = await createHighlight();
  return {
    creator: user._id,
    coordination: faker.lorem.sentence(10),
    whatAreWeDoing: faker.lorem.sentence(15),
    introToHighlights: faker.lorem.sentence(20),
    highlight: [highlight._id],
    ...overrides,
  };
};

export const createCoordination = async (overrides = {}) =>
  Coordination.model.create(await makeCoordination(overrides));
