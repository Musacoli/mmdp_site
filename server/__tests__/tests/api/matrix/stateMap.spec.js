import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createCountryMaps } from '../../../helpers/matrix/countryMap';
import { stubModelUpdateProcess } from '../../../helpers/files';

const StateMap = keystone.list('StateMap');

const { expect } = chai;
const route = '/api/v1/matrix/state';
const getRoute = '/api/v1/matrix/lga';
const title = 'States svg';

describe('StateMap route', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('svg', 'stateSvgFile', { title });
  });

  after(() => {
    stub.restore();
  });
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(StateMap);
  });
  describe(`PUT ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });
    it('should return a 400 status when svgFile is not provided', async () => {
      const res = await app.put(route).send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
    it('should return a 201 status when valid data is sent', async () => {
      const res = await app
        .put(route)
        .attach('StateSVGFile', './server/__tests__/helpers/files/blank.svg');
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('State SVG Map');
    });
  });
  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
      await createCountryMaps();
    });

    it('should get all countryMaps ', async () => {
      const res = await app.get(getRoute);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
});
