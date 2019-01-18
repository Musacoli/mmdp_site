import chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import { user } from '../../routes/api/auth';
import keystone from '../helpers/keystone';

const { app } = keystone;

const route = '/api/v1/auth/login';

const { expect } = chai;

const server = request(app);

const completedAccount = {
  email: 'admin2@mmdp.com',
  password: 'admin2',
};
const unCompletedAccount = {
  email: 'user2@mmdp.com',
  password: 'user2',
};

const completedAccount2 = {
  username: 'admin2',
  password: 'admin2',
};

const invalidAccount = {
  username: 'swerfegr',
  password: 'sdfcsd',
};

describe('Auth route', () => {
  describe('POST /auth/login', () => {
    it('should return a 400 status when password is empty', async () => {
      const res = await server
        .post(route)
        .send({
          email: completedAccount.email,
          password: '',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error').be.a('Object');
      expect(res.body.error).to.have.property('password');
    });

    it('should return a 401 status when a user tries to login with invalid credentials', async () => {
      const res = await server
        .post(route)
        .send(invalidAccount);
      expect(res.status).to.equal(401);
    });

    it('should return a 403 status when a user with an uncompleted account tries to login', async () => {
      const res = await server
        .post(route)
        .send(unCompletedAccount);
      expect(res.status).to.equal(403);
    });

    it('should return a 200 status when a user with a completed account tries to login with email', async () => {
      const res = await server
        .post(route)
        .send(completedAccount);
      expect(res.status).to.equal(200);
    });

    it('should return a 200 status when a user with a completed account tries to login with username', async () => {
      const res = await server
        .post(route)
        .send(completedAccount2);
      expect(res.status).to.equal(200);
    });

    it('should return a 500 if an error occurred while trying to login a user', async () => {
      const stub = sinon.stub(user().model, 'findOne').rejects();

      const res = await server
        .post(route)
        .send(completedAccount);
      expect(res.status).to.equal(500);

      stub.restore();
    });
  });
});
