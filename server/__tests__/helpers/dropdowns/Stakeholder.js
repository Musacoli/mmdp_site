import keystone from 'keystone';
import { faker } from '../commons/base';

export const Stakeholder = () => keystone.list('Stakeholder');

export const createStakeholder = async (times = 1) => {
  const data = {
    address: faker.random.words(3),
  };
  const stakeholders = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    stakeholders.push(await Stakeholder().model.create(data));
  }
  return times === 1 ? stakeholders[0] : stakeholders;
};
