import keystone from 'keystone';
import { faker } from '../commons/base';

const StakeholderPartnership = keystone.list('StakeholderPartnership');

export const createStakeholderPartner = async (
  partnershipTypeId,
  times = 1,
) => {
  const data = {
    relationShip: faker.random.words(3),
    partnershipTypeId,
  };
  const stakeholder = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    stakeholder.push(await StakeholderPartnership.model.create(data));
  }
  return times === 1 ? stakeholder[0] : stakeholder;
};
