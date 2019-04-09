// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const Frequency = keystone.list('Frequency');

export const createFrequency = async (times = 1) => {
  const frequency = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    frequency.push(
      await Frequency.model.create({
        frequencyValue: faker.random.number(2),
        classification: faker.random.words(3),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? frequency[0] : frequency;
};

export const removeAllFrequencies = async () => {
  await removeAllCollections(Frequency);
};
