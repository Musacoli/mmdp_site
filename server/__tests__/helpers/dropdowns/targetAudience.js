import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const TargetAudience = keystone.list('TargetAudience');

export const createTargetAudience = async (times = 1) => {
  const targetAudiences = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    targetAudiences.push(
      await TargetAudience.model.create({
        audienceType: faker.random.words(4),
        description: faker.random.words(8),
      }),
    );
  }
  return times === 1 ? targetAudiences[0] : targetAudiences;
};

export const removeAllTargetAudiences = async () => {
  await removeAllCollections(TargetAudience);
};
