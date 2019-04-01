/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  createStaffStrength,
  removeAllStaffStrengths,
} from '../../../helpers/dropdowns/staffStrength';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';

const route = '/api/v1/dropdowns/staff-strength';

const apiCreateStaffStrength = async (payload) =>
  app.post(`${route}/create`).send(payload);

describe('Stakeholders staffStrength API', () => {
  describe('Create  staffStrength', () => {
    const staffStrengthData = {
      staffStrength: '',
      description: 'you',
    };

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('should Not create the staffStrength ', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await apiCreateStaffStrength(staffStrengthData);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('fail');
      expect(res.body.error).toBeDefined();
    });

    it('should return a 201 status when valid staffStrength and description is sent', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await app.post(`${route}/create`).send({
        staffStrength: [{ staffStrength: '10 - 20', description: 'Range 1' }],
      });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe(
        'Staff Strength option(s) successfully added',
      );
      expect(res.body.staffStrengths).toBeDefined();
    });

    it('Should Return 403 For UnAuthorized user', async () => {
      await app.loginRandom(['']);
      const res = await apiCreateStaffStrength(staffStrengthData);
      expect(res.status).toBe(403);
    });
  });

  describe('List All Staff Strengths Items', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await removeAllStaffStrengths();
      await app.loginRandom(['cms.*']);
    });

    it('should return 200 with all items in the Staff Strength Model', async () => {
      const res = await app.get(route);
      expect(res.status).toBe(200);
    });
  });

  describe('Update A StaffStrength Item', () => {
    let id;
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return 200 on a successful update', async () => {
      await app.loginRandom(['cms.dropdowns.update']);
      const res = await createStaffStrength();
      id = res._id;

      const response = await app.put(`${route}/update`).send({
        staffStrength: [
          { _id: id, staffStrength: 'new staff', description: 'remained' },
        ],
      });
      expect(response.status).toBe(200);
    });

    it('Should return 500 when an invalid Item Id is Provided', async () => {
      await app.loginRandom(['cms.*']);
      const response = await app.put(`${route}/update`).send({
        staffStrengths: {
          staffStrength: [
            {
              _id: 13422342,
              staffStrength: 'new staff',
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
        .send({ staffStrength: 'New Title' });
      expect(response.status).toBe(403);
    });
  });

  describe('Get A StaffStrength Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createStaffStrength();
      const { _id } = res;

      const response = await app
        .get(`${route}/${_id}`)
        .send({ staffStrength: 'New Title' });
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

  describe('Delete A StaffStrength Item By Id', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('Should return a 200 on a successful delete', async () => {
      await app.loginRandom(['cms.*']);
      const res = await createStaffStrength();
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
