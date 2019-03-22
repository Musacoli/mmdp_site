import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createSubTheme } from '../../../helpers/dropdowns/subTheme';

const Theme = keystone.list('ThematicPillarDropdown');
const SubTheme = keystone.list('SubTheme');

const { expect } = chai;

const route = '/api/v1/sub-theme';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let subTheme;

describe('Sub-theme route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Theme);
    await removeAllCollections(SubTheme);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      subTheme = await createSubTheme();
    });

    it('should return a 400 status when thematicPillarId or subThemeName is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ subThemeName: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid subThemeName and thematicPillarId is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            subThemeName: subTheme.subThemeName + faker.random.uuid(),
            thematicPillarId: subTheme.thematicPillarId,
            description: 'sdfsdf',
            edoTarget: 'edoTarget',
          },
        ],
      });
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      subTheme = await createSubTheme();
    });

    it('should get all sub themes', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}/:thematicPillar_id`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      subTheme = await createSubTheme();
    });

    it('should get all sub themes by thematicPillarId', async () => {
      const res = await app.get(`${route}/${subTheme.thematicPillarId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      subTheme = await createSubTheme();
    });

    it('should delete a ward', async () => {
      const subTheme = await createSubTheme();
      const { _id: id } = subTheme;
      let res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a sub theme', async () => {
      const subThemeName = 'Edited sub theme name';
      const subTheme = await createSubTheme();
      const { _id: id } = subTheme;
      const res = await app.put(updateRoute(id)).send({ subThemeName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('subTheme');
      expect(res.body.data.subTheme.subThemeName).to.equal(subThemeName);
    });
  });
});
