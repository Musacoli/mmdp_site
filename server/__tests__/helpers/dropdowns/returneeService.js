import keystone from 'keystone';
import { faker } from '../commons/base';

export const ReturneeService = () => keystone.list('ReturneeService');

export const createReturneeService = async (times = 1) => {
  const data = {
    serviceName: faker.random.words(3),
  };
  const services = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    services.push(await ReturneeService().model.create(data));
  }
  return times === 1 ? services[0] : services;
};
