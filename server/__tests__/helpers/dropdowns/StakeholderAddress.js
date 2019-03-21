import keystone from 'keystone';
import { faker } from '../commons/base';

export const StakeholderAddress = () => keystone.list('StakeholderAddress');

export const createStakeholderAddress = async (stateId, times = 1) => {
  const data = {
    address: faker.random.words(3),
    stateId,
  };
  const address = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    address.push(await StakeholderAddress().model.create(data));
  }
  return times === 1 ? address[0] : address;
};
