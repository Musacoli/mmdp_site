// eslint disable
import keystone from 'keystone';
import { faker, removeAllCollections } from '../commons/base';

const RegistrationStatus = keystone.list('RegistrationStatus');

export const createStatus = async (times = 1) => {
  const statuses = [];
  for (let i = 0; i < times; i++) {
    /* eslint-disable no-await-in-loop */
    statuses.push(
      await RegistrationStatus.model.create({
        RegistrationStatus: faker.random.words(7),
        description: faker.random.words(3),
      }),
    );
  }
  return times === 1 ? statuses[0] : statuses;
};

export const removeAllStatuses = async () => {
  await removeAllCollections(RegistrationStatus);
};
