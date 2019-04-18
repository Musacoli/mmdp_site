import expect from 'expect';
import {
  createTargetAudience,
  removeAllTargetAudiences,
} from '../../../helpers/dropdowns/targetAudience';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';

const route = '/api/v1/dropdowns/target-audience';

const apiCreateTargetAudience = async (payload) =>
  app.post(`${route}/create`).send(payload);

describe('Stakeholders Target Audience API', () => {
  describe('Create TargetAudience', () => {
    const targetAudienceData = {
      audienceType: '',
      description: 'you',
    };

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('should Not create the TargetAudience ', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await apiCreateTargetAudience(targetAudienceData);
      expect(res.status).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.error).toBeDefined();
    });

    it('should return a 201 status when valid TargetAudience and description is sent', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await app.post(`${route}/create`).send({
        TargetAudience: [{ audienceType: '10 - 20', description: 'Range 1' }],
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body.TargetAudiences).toBeDefined();
    });

    it('Should Return 403 For UnAuthorized user', async () => {
      await app.loginRandom(['']);
      const res = await apiCreateTargetAudience(targetAudienceData);
      expect(res.status).toBe(403);
    });
  });

  describe('List All Target Audiences Items', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await removeAllTargetAudiences();
      await app.loginRandom(['cms.*']);
    });

    it('should return 200 with all items in the Target Audience Model', async () => {
      const res = await app.get(route);
      expect(res.status).toBe(200);
    });
  });

  describe('Update A TargetAudience Item', () => {
    let id;
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return 200 on a successful update', async () => {
      await app.loginRandom(['cms.dropdowns.update']);
      const res = await createTargetAudience();
      id = res._id;

      const response = await app.put(`${route}/update`).send({
        TargetAudience: [
          { _id: id, audienceType: 'new staff', description: 'remained' },
        ],
      });
      expect(response.status).toBe(200);
    });

    it('Should return 500 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app.put(`${route}/update`).send({
        TargetAudiences: {
          TargetAudience: [
            {
              _id: 13422342,
              audienceType: 'new staff',
              description: 'remained',
            },
          ],
        },
      });
      expect(response.status).toBe(500);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const response = await app
        .put(`${route}/update`)
        .send({ audienceType: 'New Title' });
      expect(response.status).toBe(403);
    });
  });

  describe('Get A TargetAudience Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createTargetAudience();
      const { _id } = res;

      const response = await app
        .get(`${route}/${_id}`)
        .send({ audienceType: 'New Title' });
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

  describe('Delete A TargetAudience Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200 on a successful delete', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createTargetAudience();
      const { _id } = res;

      const response = await app.delete(`${route}/${_id}/remove`).send();
      expect(response.status).toBe(204);
    });

    it('Should return 404 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app
        .delete(`${route}/567438983920479284374/remove`)
        .send();
      expect(response.status).toBe(404);
    });

    it('Should Return 403 For UnAuthorized User', async () => {
      await app.loginRandom(['']);
      const response = await app
        .delete(`${route}/567438983920479284374/remove`)
        .send();
      expect(response.status).toBe(403);
    });
  });
});
