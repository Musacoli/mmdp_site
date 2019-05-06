import expect from 'expect';
import keystone from 'keystone';
import { app, removeAllGroupsAndUsers } from '../../../../helpers/commons/base';
import {
  createReturneeServiceCommunities,
  removeAllReturneeServiceCommunities,
} from '../../../../helpers/resources/stakeholdersDirectory/beneficiaryServiceCommunities';
import { removeAllStakeholders } from '../../../../helpers/resources/stakeholdersDirectory/stakeholders';
import { removeAllBeneficiaryServices } from '../../../../helpers/resources/stakeholdersDirectory/beneficiaries';

const route = '/api/v1/location';

describe('list stakeholders by location', () => {
  beforeEach(async () => {
    await removeAllStakeholders();
    await removeAllBeneficiaryServices();
    await removeAllReturneeServiceCommunities();
    await removeAllGroupsAndUsers();
    await app.loginRandom(['cms.stakeholder.create']);
  });
  it('should add a new beneficiary service Community', async () => {
    const communities = await createReturneeServiceCommunities();
    expect(communities._id).toBeDefined();
  });

  it('should search for all stakeholders in a country', async () => {
    const com = await createReturneeServiceCommunities();
    const countryId = com.countryId;

    let countryName = '';

    await keystone
      .list('Country')
      .model.findById(countryId)
      .then((response) => {
        countryName = response.countryName;
      });
    const res = await app.get(`${route}?country=${countryName}`);
    expect(res.body.message).toBe('stakeholders succesfully fetched');
  });

  it('should search for all stakeholders in a state', async () => {
    const com = await createReturneeServiceCommunities();
    const stateId = com.stateId;

    let stateName = '';

    await keystone
      .list('State')
      .model.findById(stateId)
      .then((response) => {
        stateName = response.stateName;
      });
    const res = await app.get(`${route}?state=${stateName}`);
    expect(res.body.message).toBe('stakeholders succesfully fetched');
  });

  it('should search for all stakeholders in a lga', async () => {
    const com = await createReturneeServiceCommunities();
    const lgaId = com.lgaId;

    let lgaName = '';

    await keystone
      .list('LGA')
      .model.findById(lgaId)
      .then((response) => {
        lgaName = response.lgaName;
      });
    const res = await app.get(`${route}?lga=${lgaName}`);
    expect(res.body.message).toBe('stakeholders succesfully fetched');
  });

  it('should search for all stakeholders in a community', async () => {
    const com = await createReturneeServiceCommunities();
    const communityId = com.communityId;

    let communityName = '';

    await keystone
      .list('Community')
      .model.findById(communityId)
      .then((response) => {
        communityName = response.communityName;
      });
    const res = await app.get(`${route}?community=${communityName}`);
    expect(res.body.message).toBe('stakeholders succesfully fetched');
  });

  it('should search for all stakeholders in a country not found', async () => {
    const res = await app.get(`${route}?country=Nigeria`);
    expect(res.body.error).toBe(
      'There are no results for the country provided',
    );
  });
  it('should search for all stakeholders in a country with country not valid', async () => {
    const res = await app.get(`${route}?country=`);
    expect(res.body.error).toBe(
      'There are no results for the country provided',
    );
  });
  it('should search for all stakeholders in a state not found', async () => {
    const res = await app.get(`${route}?state=Edo`);
    expect(res.body.error).toBe('There are no results for the state provided');
  });
  it('should search for all stakeholders in a state with state not valid', async () => {
    const res = await app.get(`${route}?state=`);
    expect(res.body.error).toBe('There are no results for the state provided');
  });
  it('should search for all stakeholders in lga not found', async () => {
    const res = await app.get(`${route}?lga=local`);
    expect(res.body.error).toBe('There are no results for the lga provided');
  });
  it('should search for all stakeholders in a lga with lga not valid', async () => {
    const res = await app.get(`${route}?lga=`);
    expect(res.body.error).toBe('There are no results for the lga provided');
  });
  it('should search for all stakeholders in a community not found', async () => {
    const res = await app.get(`${route}?community=community`);
    expect(res.body.error).toBe(
      'There are no results for the community provided',
    );
  });
  it('should search for all stakeholders in a community with community not valid', async () => {
    const res = await app.get(`${route}?community=`);
    expect(res.body.error).toBe(
      'There are no results for the community provided',
    );
  });
  it('should search for all stakeholders in an unrecognizable location', async () => {
    const res = await app.get(`${route}?aikj3aod=`);
    expect(res.body.error).toBe('The search query provided is not valid');
  });

  it('should search for all stakeholders location unrecognized', async () => {
    const res = await app.get(`${route}?aikj3aod=community`);
    expect(res.body.error).toBe('The search query provided is not valid');
  });
});
