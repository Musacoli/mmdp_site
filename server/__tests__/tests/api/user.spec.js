/* eslint-disable  no-underscore-dangle */
import chai from 'chai';
import {
  app,
  createUser,
  removeAllGroupsAndUsers,
  createGroup,
} from '../../helpers/commons/base';
import response, {
  passwordError,
  status,
} from '../../../constants/controllerConstants';
import errorresp from '../../../constants/middlewareConstants';
import token from '../../../utils/tokenGenerator';

chai.should();

const data = {
  email: 'admin@mmdp.com',
  newEmail: 'user@mmdp.com',
  postUrl: '/api/v1/users',
  getAllUrl: '/api/v1/users',
  emailRequired: 'please input the email',
  oldEmail: 'mmdp@mail.com',
  invalidEmail: 'mmdp@mail',
  validEmailRequired: 'please input a valid email',
};

const fullUserPermission = ['user.*'];

describe('Users', () => {
  describe('Create users', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['user.create']);
    });

    it('should create a user successfully', async () => {
      const group = await createGroup();
      const res = await app.post(data.postUrl).send({
        email: data.email,
        groups: [group._id],
      });
      res.status.should.equal(201);
      res.body.message.should.equal(response.accountCreated);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should create successfully with full users permission', async () => {
      const group = await createGroup();
      await app.loginRandom(fullUserPermission);
      const res = await app.post(data.postUrl).send({
        email: data.email,
        groups: [group._id],
      });
      res.status.should.equal(201);
      res.body.message.should.equal(response.accountCreated);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should return an error when a user is created without email', async () => {
      const res = await app.post(data.postUrl).send();
      res.status.should.equal(400);
      res.body.message.should.equal(data.emailRequired);
    });

    it('should return an error if email and groups are not provided', async () => {
      const res = await app.post(data.postUrl).send(data.oldEmail);
      res.status.should.equal(400);
      res.body.message.should.equal(
        'only email and groups fields are required!',
      );
    });

    it('should return raise an error when registering with an invalid email', async () => {
      const group = createGroup();
      const res = await app.post(data.postUrl).send({
        email: data.invalidEmail,
        groups: [group._id],
      });
      res.status.should.equal(400);
      res.body.message.should.equal(data.validEmailRequired);
      res.body.status.should.equal(status.FAIL);
    });

    it('should fail if the user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await app.post(data.postUrl).send({ email: data.email });
      res.status.should.equal(403);
    });
  });

  describe('Fetch users', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['user.view']);
    });

    it('should fetch all users', async () => {
      const res = await app.get(data.getAllUrl).send();
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should fetch all users with full users permission', async () => {
      await app.loginRandom(fullUserPermission);
      const res = await app.get(data.getAllUrl).send();
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should fail if the user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await app.get(data.getAllUrl).send();
      res.status.should.equal(403);
    });
  });

  describe('Update user details - admin', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['user.update']);
    });

    it('should update user details', async () => {
      await createUser([], { email: data.email });
      const res = await app.put(data.getAllUrl).send({
        email: data.email,
        newEmail: data.newEmail,
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should update user details with full users permission', async () => {
      await app.loginRandom(fullUserPermission);
      await createUser([], { email: data.email });
      const res = await app.put(data.getAllUrl).send({
        email: data.email,
        newEmail: data.newEmail,
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should not update with un-existing email', async () => {
      const res = await app.put(data.getAllUrl).send({
        email: 'mmdp@mail.com',
        newEmail: data.newEmail,
      });
      res.status.should.equal(404);
      res.body.message.should.equal(errorresp.oldEmail);
    });

    it('should not update with existing email', async () => {
      await createUser([], { email: data.email });
      await createUser([], { email: data.newEmail });
      const res = await app.put(data.getAllUrl).send({
        email: data.email,
        newEmail: data.newEmail,
      });
      res.status.should.equal(404);
      res.body.message.should.equal(errorresp.newEmail);
    });

    it('should not update with invalid emails', async () => {
      await createUser([], { email: data.email });
      await createUser([], { email: data.newEmail });
      const res = await app.put(data.getAllUrl).send({
        email: data.invalidEmail,
        newEmail: data.newEmail,
      });
      res.status.should.equal(404);
      res.body.status.should.equal(status.FAIL);
    });

    it('should not update with only one email provided', async () => {
      await createUser([], { email: data.email });
      await createUser([], { email: data.newEmail });
      const res = await app.put(data.getAllUrl).send({
        oldEmail: data.invalidEmail,
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
    });

    it('should not update with empty fields', async () => {
      await createUser([], { email: data.email });
      await createUser([], { email: data.newEmail });
      const res = await app.put(data.getAllUrl).send();
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
    });

    it('should fail if the user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await app.put(data.getAllUrl).send();
      res.status.should.equal(403);
    });
  });

  describe('Fetch a specific user', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      // create a verified user
      await createUser([], {
        email: data.newEmail,
        confirmed: true,
        username: 'newuser',
      });
      await app.loginRandom(['user.view']);
    });

    it('should fetch a user', async () => {
      const res = await app.get('/api/v1/users/newuser').send();
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should fetch a user with full user permission', async () => {
      await app.loginRandom(fullUserPermission);
      const res = await app.get('/api/v1/users/newuser').send();
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should return 404 if user does not exist', async () => {
      const res = await app.get('/api/v1/users/mmdp').send();
      res.status.should.equal(404);
      res.body.status.should.equal(status.FAIL);
    });

    it('should return 404 if wrong url is used', async () => {
      const res = await app.get('/api/v1/mmdp').send();
      res.status.should.equal(404);
    });

    it('should fail if the user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await app.get('/api/v1/users/mmdp').send();
      res.status.should.equal(403);
    });
  });

  describe('Verify user account', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      // create unverified user
      await createUser([], { email: data.newEmail, confirmed: false });
    });

    it('should raise an error if token is not provided', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Qixndbx34',
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.tokenMissing);
      res.body.status.should.equal(status.FAIL);
    });

    it('should successfully verify account', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Qixndbx34',
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should not not verify if token  is invalid', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Qixndbx34',
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.email),
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.notFound);
      res.body.status.should.equal(status.FAIL);
    });

    it('should not not verify if password is not provided', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.passRequired);
      res.body.status.should.equal(status.FAIL);
    });

    it('should not not verify if username is not provided', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Qixndbx34',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.usernameRequired);
      res.body.status.should.equal(status.FAIL);
    });

    it('should raise an error if a user tries to verify twice', async () => {
      const verifyData = {
        password: 'Qixndbx34',
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      };
      await app.put('/api/v1/users/confirmation').send(verifyData); // verification
      const res = await app.put('/api/v1/users/confirmation').send(verifyData); // attempt to verify again
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.accVerified);
      res.body.status.should.equal(status.FAIL);
    });

    it('should raise an error if verification is done with a weak password', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Q1234',
        username: 'newuser',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
    });

    it('should raise an error if verification is done with short username', async () => {
      const res = await app.put('/api/v1/users/confirmation').send({
        password: 'Qixndbx34',
        username: 'new',
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail),
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.usernameLength);
    });
  });

  describe('Update user details - self', () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      // create a verified account
      const user = await createUser([], {
        email: data.newEmail,
        confirmed: true,
        username: 'newuser',
      });
      await app.login(user);
    });

    it('should fail if account is not activated', async () => {
      // create an unverified account
      const user = await createUser([], { confirmed: false });
      // login the user
      await app.login(user);
      const res = await app
        .put('/api/v1/users/edit')
        .send({ username: 'levis' });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.activateAcc);
    });

    it('should fail if password does not meet criteria', async () => {
      const res = await app.put('/api/v1/users/edit').send({
        password: 'Securmsy',
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(passwordError.password);
    });

    it('should fail if username is less than 5 characters', async () => {
      const res = await app.put('/api/v1/users/edit').send({
        username: 'new',
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(errorresp.usernameLength);
    });

    it('should change password successfully', async () => {
      const res = await app.put('/api/v1/users/edit').send({
        password: 'Securms392y',
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should change username successfully', async () => {
      const res = await app.put('/api/v1/users/edit').send({
        username: 'newadmin',
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should change both username and password successfully', async () => {
      const res = await app.put('/api/v1/users/edit').send({
        username: 'newUser',
        password: 'Securms392y',
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it('should fail if username is a duplicate', async () => {
      // create a verified user
      const user = await createUser([], { confirmed: true });
      await app.login(user);
      // attempt to update their username to existing an existing one
      const res = await app.put('/api/v1/users/edit').send({
        email: data.email,
        username: 'newuser',
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(errorresp.usernameTaken);
    });

    it('should fail if the user is not authenticated', async () => {
      await app.logout();
      const res = await app.put('/api/v1/users/edit').send();
      res.status.should.equal(401);
    });
  });
});
