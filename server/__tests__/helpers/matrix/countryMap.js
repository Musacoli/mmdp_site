// country helper here
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';
import Research from '../../../models/resources/Research';
import { data } from '../resources/research';

const CountryMap = keystone.list('CountryMap');

export const countrySvgFile = {
  mimetype: 'image/svg+xml',
  filename: faker.system.fileName('.svg'),
  path: '/assets/documents',
  size: faker.random.number(),
  etag: faker.random.uuid(),
  bucket: faker.lorem.word(),
  url: faker.internet.url(),
};

export const createCountryMaps = async (times = 1) => {
  const countryMaps = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    countryMaps.push(
      await CountryMap.model.create({
        countryName: faker.random.words(7),
        countrySvgFile,
      }),
    );
  }
  return times === 1 ? countryMaps[0] : 'maps';
};
