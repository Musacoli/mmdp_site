import keystone from 'keystone';
import { faker } from '../commons/base';

export const ReturneeService = () => keystone.list('ReturneeService');

export const createReturneeService = async (description, times = 1) => {
  const data = {
    address: faker.random.words(3),
    serviceName: faker.random.words(3),
    description,
    stakeholderId: '5c9b27e320bed68318c5396d',
  };
  const address = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    address.push(await ReturneeService().model.create(data));
  }
  return times === 1 ? address[0] : address;
};
