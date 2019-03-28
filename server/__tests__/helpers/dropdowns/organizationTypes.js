import keystone from 'keystone';
import { faker } from '../commons/base';

const OrganisationType = keystone.list('OrganisationType');

export const createOrganisationType = async () => {
  const data = {
    typeName: faker.random.words(3),
    description: faker.random.words(3),
  };
  const OrganisationTypes = [];
  OrganisationTypes.push(await OrganisationType.model.create(data));
  return OrganisationTypes[0];
};
