// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const Country = keystone.list('Country');

export const createCountries = async (times = 1) => {
  const countries = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    countries.push(
      await Country.model.create({
        countryName: faker.random.words(7),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? countries[0] : 'statuses';
};

export const removeAllStatuses = async () => {
  await removeAllCollections(Country);
};
