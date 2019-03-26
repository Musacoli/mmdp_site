import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const LGA = keystone.list('LGA');
const Ward = keystone.list('Ward');

export const createLGA = async (stateId, times = 1) => {
  const data = {
    lgaName: faker.random.words(3),
    description: faker.random.words(3),
    stateId,
  };
  const localGovernments = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    localGovernments.push(await LGA.model.create(data));
  }
  return times === 1 ? localGovernments[0] : localGovernments;
};

export const createWard = async (times = 1) => {
  const wards = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    wards.push(
      await Ward.model.create({
        wardName: faker.random.words(3),
        lgaId: (await createLGA())._id,
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? wards[0] : wards;
};

export const removeAllWards = async () => {
  await removeAllCollections(Ward);
};
