import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createFocusArea } from '../../../helpers/dropdowns/focusArea';

const Theme = keystone.list('ThematicPillarDropdown');
const SubTheme = keystone.list('SubTheme');
const FocusArea = keystone.list('FocusArea');

const { expect } = chai;

const route = '/api/v1/focus-area';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let focus;

describe('Sub-theme route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Theme);
    await removeAllCollections(SubTheme);
    await removeAllCollections(FocusArea);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      focus = await createFocusArea();
    });

    it('should return a 400 status when subThemeId or focusAreaName is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ focusAreaName: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid subThemeId and focusAreaName is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            focusAreaName: focus.focusAreaName + faker.random.uuid(),
            subThemeId: focus.subThemeId,
            description: 'sdfsdf',
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
      focus = await createFocusArea();
    });

    it('should get all Focus Areas', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}/:subTheme_id`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      focus = await createFocusArea();
    });

    it('should get all Focus Areas by sub themes', async () => {
      const res = await app.get(`${route}/${focus.subThemeId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      focus = await createFocusArea();
    });

    it('should delete a Focus Area', async () => {
      const FocusArea = await createFocusArea();
      const { _id: id } = FocusArea;
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

    it('should update a focus Area', async () => {
      const focusAreaName = 'edit';
      const FocusArea = await createFocusArea();
      const { _id: id } = FocusArea;
      const res = await app.put(updateRoute(id)).send({ focusAreaName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
});
