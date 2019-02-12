/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import sinon from 'sinon';
import modelHelper from '../../../helpers/modelHelper';
import { createResearch, data } from '../../helpers/resources/research';
import { app, removeAllGroupsAndUsers } from '../../helpers/commons/base';

const route = '/api/v1/resources/research';

const title = 'This user research';
const responseData = {
  ...data,
  _id: '5c54ed71193ac3510f55ebcd',
};

const apiCreateResearch = async (payload) => app.post(route).send(payload);

describe('Resources research API', () => {
  describe('Create  research', () => {
    const researchData = {
      title: 'yooo',
      researchFile: '../../../../helpers/files/blank.pdf',
    };
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('should Not create the Admin research ', async () => {
      await app.loginRandom(['cms.resources.create']);
      const res = await apiCreateResearch(researchData);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('fail');
      expect(res.body.error).toBeDefined();
    });
    it('should return a 201 status when valid title and researchFile is sent', async () => {
      await app.loginRandom(['cms.resources.create']);
      const stub = sinon
        .stub(modelHelper, 'process')
        .resolves(Promise.resolve(responseData));

      const res = await app
        .post(route)
        .field('title', title)
        .attach('researchFile', './server/__tests__/helpers/files/blank.pdf');

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('Research has been successfully added!');
      expect(res.body.data).toBeDefined();
      stub.restore();
    });

    it('Should Return 403 For UnAuthorized user', async () => {
      await app.loginRandom(['']);
      const res = await apiCreateResearch(researchData);
      expect(res.status).toBe(403);
    });
  });

  describe('List All Research Items', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return 200 with all items in the Research Model', async () => {
      await app.loginRandom(['cms.*']);
      const res = await app.get(route).send();
      expect(res.status).toBe(200);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const res = await app.get(route).send();
      expect(res.status).toBe(403);
    });
  });

  describe('Update A Research Item', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return 200 on a successful update', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createResearch();
      const { _id } = res;

      const response = await app
        .put(`${route}/${_id}`)
        .send({ title: 'New Title' });
      expect(response.status).toBe(200);
    });

    it('Should return 404 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app
        .put(`${route}/567438983920479284374`)
        .send({ title: 'New Title' });
      expect(response.status).toBe(404);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const response = await app
        .put(`${route}/567438983920479284374`)
        .send({ title: 'New Title' });
      expect(response.status).toBe(403);
    });
  });

  describe('Get A Research Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createResearch();
      const { _id } = res;

      const response = await app
        .get(`${route}/${_id}`)
        .send({ title: 'New Title' });
      expect(response.status).toBe(200);
    });

    it('Should return 404 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app.get(`${route}/567438983920479284374`).send();
      expect(response.status).toBe(404);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const response = await app.get(`${route}/567438983920479284374`).send();
      expect(response.status).toBe(403);
    });
  });

  describe('Delete A Research Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200 on a successful delete', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createResearch();
      const { _id } = res;

      const response = await app.delete(`${route}/${_id}`).send();
      expect(response.status).toBe(204);
    });

    it('Should return 404 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app
        .delete(`${route}/567438983920479284374`)
        .send();
      expect(response.status).toBe(404);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const response = await app
        .delete(`${route}/567438983920479284374`)
        .send();
      expect(response.status).toBe(403);
    });
  });
});
