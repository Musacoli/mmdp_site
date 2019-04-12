// state helper here
import keystone from 'keystone';
import { faker } from '../commons/base';

const StateMap = keystone.list('StateMap');

export const createStateMaps = async (times = 1) => {
  const stateMaps = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    stateMaps.push(
      await StateMap.model.create({
        countryName: faker.random.words(7),
        uniqueId: faker.random.uuid(),
        name: faker.random.words(7),
        path: `M 5656${faker.random.words(7)}`,
      }),
    );
  }
  return times === 1 ? stateMaps[0] : 'maps';
};
