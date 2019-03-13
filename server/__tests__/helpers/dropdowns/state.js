// eslint disable
import { faker, removeAllCollections } from '../commons/base';
import State from '../../../models/Dropdowns/State';
import Country from '../../../models/Dropdowns/Country';

export const createCountry = async (overrides = {}, times = 1) => {
  const data = {
    countryName: faker.random.words(3),
    description: faker.random.words(3),
    ...overrides,
  };
  const countries = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    countries.push(await Country.model.create(data));
  }
  return times === 1 ? countries[0] : countries;
};

export const createState = async (times = 1) => {
  const states = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    states.push(
      await State.model.create({
        stateName: faker.random.words(3),
        countryId: (await createCountry())._id,
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? states[0] : states;
};

export const removeAllStates = async () => {
  await removeAllCollections(State);
};
