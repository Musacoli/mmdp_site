import keystone from 'keystone';
import { faker } from '../commons/base';

const ImpactType = keystone.list('ImpactType');

export const createImpactType = async (impactTypeId, times = 1) => {
  const data = {
    impactTypeName: faker.random.words(3),
    description: faker.random.words(3),
    impactTypeId,
  };
  const impactType = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    impactType.push(await ImpactType.model.create(data));
  }
  return times === 1 ? impactType[0] : impactType;
};
