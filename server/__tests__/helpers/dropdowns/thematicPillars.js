// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const ThematicPillarDropdown = keystone.list('ThematicPillarDropdown');

export const createThematicPillarDropdown = async (times = 1) => {
  const thematicPillars = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    thematicPillars.push(
      await ThematicPillarDropdown.model.create({
        pillarTitle: faker.random.words(7),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? thematicPillars[0] : thematicPillars;
};

export const removeAllStatuses = async () => {
  await removeAllCollections(ThematicPillarDropdown);
};
