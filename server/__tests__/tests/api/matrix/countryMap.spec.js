import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createCountryMaps } from '../../../helpers/matrix/countryMap';
import { stubModelUpdateProcess } from '../../../helpers/files';

const CountryMap = keystone.list('CountryMap');

const { expect } = chai;
const route = '/api/v1/national-matrix';
const title = 'Nigeria states svg';

describe('CountryMap route', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('svg', 'countrySvgFile', { title });
  });

  after(() => {
    stub.restore();
  });
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(CountryMap);
  });
  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });
    it('should return a 400 status when countryName is not provided', async () => {
      const res = await app.post(route).send({ countryName: '' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
    it('should return a 400 status when svgFile is not provided', async () => {
      const res = await app.post(route).send({ countryName: 'Kenya' });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
    it('should return a 201 status when valid data is sent', async () => {
      const res = await app
        .post(route)
        .field('filename', title)
        .field('countryName', 'Kenya')
        .attach('countrySvgFile', './server/__tests__/helpers/files/blank.svg');
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('newNationalSvg');
    });
  });
  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
      await createCountryMaps();
    });

    it('should get all countryMaps ', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
  describe(`PUT request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });
    it('should update country map', async () => {
      const countryMap = await createCountryMaps();
      const res = await app
        .put(route)
        .field('filename', title)
        .field('countryName', countryMap.countryName)
        .attach('countrySvgFile', './server/__tests__/helpers/files/blank.svg');
      expect(res.status).to.equal(200);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return 404 when updating non-existing map', async () => {
      const res = await app
        .put(route)
        .field('filename', title)
        .field('countryName', 'Kenya')
        .attach('countrySvgFile', './server/__tests__/helpers/files/blank.svg');
      expect(res.status).to.equal(404);
    });
  });
});
