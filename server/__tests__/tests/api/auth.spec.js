import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
  createUser,
  removeAllGroupsAndUsers,
  app,
} from '../../helpers/commons/base';
import { generateToken } from '../../helpers/commons/jwt';
import { user } from '../../../routes/api/auth';

chai.should();
chai.use(sinonChai);

const testData = () => ({
  email: 'test@mmdp.com',
  badEmail: 'bademail',
  badUrl: 'Badurl',
  baseUrl: 'http://localhost:3000',
  resetPasswordUrl: '/api/v1/auth/reset-password',
  changePasswordUrl: '/api/v1/auth/change-password',
  password: 'newPassword',
  confirmPassword: 'newPassword',
  invalidConfirmPassword: 'pass',
  validToken: generateToken({ email: 'test@mmdp.com' }),
  resetSuccessMessage:
    'A password reset link has been sent to your email address',
  changePasswordSuccessMessage:
    'Reset password successful. Login to your account',
});

describe('User Authentication', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    // await app.loginRandom(['user.create']);
  });
  afterEach(async () => {
    sinon.restore();
  });
  describe('resetPassword', async () => {
    it('should succesfully reset password', async () => {
      await createUser([], { email: testData().email });
      const res = await app.post(testData().resetPasswordUrl).send({
        email: testData().email,
        baseUrl: testData().baseUrl,
      });
      res.status.should.equal(200);
      res.body.message.should.equal(testData().resetSuccessMessage);
    });
    it('should fail to reset password', async () => {
      await createUser([], { email: testData().email });
      const res = await app.post(testData().resetPasswordUrl).send({
        email: testData().badEmail,
        baseUrl: testData().badUrl,
      });
      res.status.should.equal(400);
      res.body.message.should.equal('Validation error');
    });
    it('should fail to reset password', async () => {
      await createUser([], { email: testData().email });
      const res = await app.post(testData().resetPasswordUrl).send({
        email: 'notExist@mail.com',
        baseUrl: testData().baseUrl,
      });
      res.status.should.equal(404);
    });
    it('should return server error', async () => {
      await sinon.stub(user().model, 'findOne').rejects();
      await createUser([], { email: testData().email });
      const res = await app.post(testData().resetPasswordUrl).send({
        email: 'notExist@mail.com',
        baseUrl: testData().baseUrl,
      });
      res.status.should.equal(500);
    });
  });
  describe('changePassword', async () => {
    it('should succesfully change password', async () => {
      const user = await createUser([], { email: testData().email });
      await app.login(user);
      const res = await app.post(testData().changePasswordUrl).send({
        password: testData().password,
        confirmPassword: testData().confirmPassword,
      });
      res.status.should.equal(200);
      res.body.message.should.equal(testData().changePasswordSuccessMessage);
    });
    it('should return authentication error', async () => {
      await createUser([], { email: testData().email });
      await app.logout();
      const res = await app.post(testData().changePasswordUrl).send({
        password: testData().password,
        confirmPassword: testData().confirmPassword,
      });
      res.status.should.equal(401);
    });
    it('should return validation error', async () => {
      await createUser([], { email: testData().email });
      const res = await app.post(testData().changePasswordUrl).send({
        password: testData().password,
        confirmPassword: testData().invalidConfirmPassword,
      });
      res.status.should.equal(400);
      res.body.message.should.equal('Validation error');
    });
    it('should return server error', async () => {
      await sinon.stub(user().model, 'update').rejects();
      const user2 = await createUser([], { email: testData().email });
      await app.login(user2);
      const res = await app.post(testData().changePasswordUrl).send({
        password: testData().password,
        confirmPassword: testData().confirmPassword,
      });
      res.status.should.equal(500);
    });
  });
});
