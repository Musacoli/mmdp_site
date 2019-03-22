// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const FocusArea = keystone.list('FocusArea');
const SubTheme = keystone.list('SubTheme');
const ThematicPillarDropdown = keystone.list('ThematicPillarDropdown');

export const createThematicPillarDropdown = async (times = 1) => {
  const thematicPillars = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    thematicPillars.push(
      await ThematicPillarDropdown.model.create({
        pillarTitle: faker.random.words(3),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? thematicPillars[0] : thematicPillars;
};

export const createSubTheme = async (times = 1) => {
  const subThemes = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    subThemes.push(
      await SubTheme.model.create({
        subThemeName: faker.random.words(3),
        thematicPillarId: (await createThematicPillarDropdown())._id,
        description: faker.random.words(3),
        edoTarget: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? subThemes[0] : subThemes;
};

export const createFocusArea = async (times = 1) => {
  const states = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    states.push(
      await FocusArea.model.create({
        focusAreaName: faker.random.words(3),
        subThemeId: (await createSubTheme())._id,
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? states[0] : states;
};

export const removeAllAreas = async () => {
  await removeAllCollections(FocusArea);
};
