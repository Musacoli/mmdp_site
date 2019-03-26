// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';
import { createLGA } from './LGA';

const Community = keystone.list('Community');
const Ward = keystone.list('Ward');

export const createWard = async (times = 1) => {
  const data = {
    wardName: faker.random.words(3),
    description: faker.random.words(3),
    lgaId: (await createLGA())._id,
  };
  const wards = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    wards.push(await Ward.model.create(data));
  }
  return times === 1 ? wards[0] : wards;
};

export const createCommunity = async (count = 1) => {
  const communities = [];
  for (let x = 0; x < count; x++) {
    /* eslint-disable no-await-in-loop */
    const community = await Community.model.create({
      communityName: faker.random.words(3),
      wardId: (await createWard())._id,
      description: faker.random.words(3),
    });
    communities.push(community);
  }
  return count === 1 ? communities[0] : communities;
};

export const removeAllCommunities = async () => {
  await removeAllCollections(Community);
};
