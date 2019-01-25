import chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import {User} from '../../models/User';
import {user} from '../../routes/api/auth';
import keystone from '../helpers/keystone';

const {app} = keystone;

const route = '/api/v1/auth/login';

const {expect} = chai;

const server = request(app);

const createAccount = async (data) => await User.model.create({...data});

const completedAccount = {
  email: 'tbag@mmdp.com',
  username: 'tbag',
  password: 'admin',
};

const unCompletedAccount = {
  email: 'cnote@mmdp.com',
  username: 'cnote',
  password: 'user',
};

const completedAccount2 = {
  email: 'henry@mmdp.com',
  username: 'henry',
  password: 'henry',
};

const invalidAccount = {
  username: 'foo',
  password: 'bar',
};

describe('Auth route', () => {
  before(async () => {
    await User.model.remove();
    // create completed and uncompleted accounts
    await createAccount({...completedAccount, confirmed: true});
    await createAccount(unCompletedAccount);
    await createAccount({...completedAccount2, confirmed: true});
  });

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
