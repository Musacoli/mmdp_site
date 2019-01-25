import chai, { expect } from "chai";
import supertest from "supertest";
import keystone from "./helpers/keystone";
import { User } from "../models/User";
import data from "./mockData";
import { status } from "../constants/controllerConstants";
import response, {passwordError} from "../constants/controllerConstants";
import errorresp from "../constants/middlewareConstants";
import token from "../utils/tokenGenerator";

const request = supertest(keystone.app);
chai.should();

describe("Create users", () => {
  before(async () => {
    await User.model.remove();
  });

  it("should return 201 status a user is created", async () => {
    const res = await request.post(data.postUrl).send({ email: data.email });
    res.status.should.equal(201);
    res.body.message.should.equal(response.accountCreated);
    res.body.status.should.equal(status.SUCCESS);
  });

  it("should return an error when a user is created without email", async () => {
    const res = await request.post(data.postUrl).send();
    res.status.should.equal(400);
    res.body.message.should.equal(data.emailRequired);
    res.body.status.should.equal(status.FAIL);
  });

  it("should return an error if other fields are provided other than email", async () => {
    const res = await request.post(data.postUrl).send(data.oldEmail);
    res.status.should.equal(400);
    res.body.message.should.equal(errorresp.onlyEmail);
    res.body.status.should.equal(status.FAIL);
  });

  it("should return raise an error when registering with an invalid email", async () => {
    const res = await request
      .post(data.postUrl)
      .send({ email: data.invalidEmail });
    res.status.should.equal(400);
    res.body.message.should.equal(data.validEmailRequired);
    res.body.status.should.equal(status.FAIL);
  });
});

describe("fetch users", () => {
  it("should fetch all users", async () => {
    const res = await request.get(data.getAllUrl).send();
    res.status.should.equal(200);
    res.body.status.should.equal(status.SUCCESS);
  });
});

describe("Admin can update user details", () => {
  before(async () => {
    await User.model.remove();
  });

  it("should update user details", async () => {
    await request.post(data.postUrl).send({ email: data.email });
    const res = await request.put(data.getAllUrl).send({
      oldEmail: data.email,
      newEmail: data.newEmail
    });
    res.status.should.equal(200);
    res.body.status.should.equal(status.SUCCESS);
  });

  it("should not update with un-existing email", async () => {
    const res = await request.put(data.getAllUrl).send({
      oldEmail: "mmdp@mail.com",
      newEmail: data.newEmail
    });
    res.status.should.equal(404);
    res.body.message.should.equal(errorresp.oldEmail);
  });

  it("should not update with existing email", async () => {
    await request.post(data.postUrl).send({ email: data.email });
    await request.post(data.postUrl).send({ email: data.newEmail });
    const res = await request.put(data.getAllUrl).send({
      oldEmail: data.email,
      newEmail: data.newEmail
    });
    res.status.should.equal(404);
    res.body.message.should.equal(errorresp.newEmail);
  });

  it("should not update with invalid emails", async () => {
    await request.post(data.postUrl).send({ email: data.email });
    await request.post(data.postUrl).send({ email: data.newEmail });
    const res = await request.put(data.getAllUrl).send({
      oldEmail: data.invalidEmail,
      newEmail: data.newEmail
    });
    res.status.should.equal(400);
    res.body.status.should.equal(status.FAIL);
  });

  it("should not update with only one email provided", async () => {
    await request.post(data.postUrl).send({ email: data.email });
    await request.post(data.postUrl).send({ email: data.newEmail });
    const res = await request.put(data.getAllUrl).send({
      oldEmail: data.invalidEmail
    });
    res.status.should.equal(400);
    res.body.status.should.equal(status.FAIL);
  });

  it("should not update with empty fields", async () => {
    await request.post(data.postUrl).send({ email: data.email });
    await request.post(data.postUrl).send({ email: data.newEmail });
    const res = await request.put(data.getAllUrl).send();
    res.status.should.equal(400);
    res.body.status.should.equal(status.FAIL);
  });
});

describe("fetch a specific user", () => {
  before(async () => {
    await User.model.remove();
    await request.post(data.postUrl).send({ email: data.newEmail });
    await request.put("/api/v1/users/confirmation").send({
      password: "Pooler32",
      username: "newuser",
      firstName: "first name",
      lastName:  "last name",
      phone: "0700888111",
      token: token(data.newEmail)
    });
  });

  it("should fetch a user", async () => {
    const res = await request.get("/api/v1/users/newuser").send();
    res.status.should.equal(200);
    res.body.status.should.equal(status.SUCCESS);
  });

  it("should return 404 if user does not exist", async () => {
    const res = await request.get("/api/v1/users/mmdp").send();
    res.status.should.equal(404);
    res.body.status.should.equal(status.FAIL);
  });

  it("should return 404 if wrong url is used", async () => {
    const res = await request.get("/api/v1/mmdp").send();
    res.status.should.equal(404);
  });
});

  describe("Verify user account", () => {
    before(async () => {
      await User.model.remove();
      await request.post(data.postUrl).send({ email: data.newEmail });
    });

    it("should raise an error if token is not provided", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName'
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.tokenMissing);
      res.body.status.should.equal(status.FAIL);
    });

    it("should successfully verify account", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail)
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it("should not not verify if token  is invalid", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.email)
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.notFound);
      res.body.status.should.equal(status.FAIL);
    });

    it("should not not verify if password is not provided", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail)
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.passRequired);
      res.body.status.should.equal(status.FAIL);
    });

    it("should not not verify if username is not provided", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail)
      });
      res.status.should.equal(401);
      res.body.message.should.equal(errorresp.usernameRequired);
      res.body.status.should.equal(status.FAIL);
    });

    it("should raise an error if a user tries to verify twice", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail)
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.accVerified);
      res.body.status.should.equal(status.FAIL);
    });

    it("should raise an error if verification is done with a weak password", async () => {
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Q1234",
        username: "newuser",
        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.newEmail)
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
    });

    it("should raise an error if verification is done with short username", async () => {
      await request.post(data.postUrl).send({ email: data.email });
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Q1234rmndd",
        username: "new",        phone: '0700111222',
        firstName: 'firstName',
        lastName: 'lastName',
        token: token(data.email)
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.usernameLength);
    });
  });

describe("fetch a specific user", () => {
  before(async () => {
    await User.model.remove();
    await request.post(data.postUrl).send({email: data.newEmail});
    await request.put("/api/v1/users/confirmation").send({
      password: "Pooler32",
      username: "newuser",
      phone: '0700111222',
      firstName: 'firstName',
      lastName: 'lastName',
      token: token(data.newEmail)
    });
  });

  it("should fetch a user", async () => {
    const res = await request.delete("/api/v1/users/newuser").send();
    res.status.should.equal(200);
    res.body.status.should.equal(status.SUCCESS);
  });

  it("should return 404 if user does not exist", async () => {
    const res = await request.delete("/api/v1/users/mmdp").send();
    res.status.should.equal(404);
    res.body.status.should.equal(status.ERROR);
  });

  it("should return 404 if wrong url is used", async () => {
    const res = await request.delete("/api/v1/mmdp").send();
    res.status.should.equal(404);
  });
});

  describe("users should edit their details", () => {
    beforeEach(async () => {
      await User.model.remove();
      await request.post(data.postUrl).send({ email: data.newEmail });
      const res = await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "newuser",
        phone: '0727888111',
        firstName: 'first name',
        lastName: 'last name',
        token: token(data.newEmail)
      });
    });

    afterEach(async () => {
      await User.model.remove();
    });

    it("should fail if user email is not provided", async () => {
      const res = await request.put("/api/v1/users/edit").send();
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.provideEmail);
    });

    it("should fail if provided email does not exist", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: "code@mail.com"
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.notFound);
    });

    it("should fail if account is not activated", async () => {
      await request.post(data.postUrl).send({ email: data.email });
      const res = await request.put("/api/v1/users/edit").send({
        email: data.email,
        username: "levis"
      });
      res.status.should.equal(400);
      res.body.message.should.equal(errorresp.activateAcc);
    });

    it("should fail if password does not meet criteria", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: data.newEmail,
        password: "Securmsy"
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(passwordError.password);

    });

    it("should fail if username is less than 5 characters", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: data.newEmail,
        username: "new"
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(errorresp.usernameLength);
    });

    it("should change password successfully", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: data.newEmail,
        password: "Securms392y"
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it("should change username successfully", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: data.newEmail,
        username: "newadmin"
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it("should change both username and password successfully", async () => {
      const res = await request.put("/api/v1/users/edit").send({
        email: data.newEmail,
        username: "newUser",
        password: "Securms392y"
      });
      res.status.should.equal(200);
      res.body.status.should.equal(status.SUCCESS);
    });

    it("should fail if username is a duplicate", async () => {
      await request.post(data.postUrl).send({ email: data.email });
      await request.put("/api/v1/users/confirmation").send({
        password: "Qixndbx34",
        username: "mmdp24",
        firstName: 'first name',
        lastName: 'last name',
        phone: '0700888111',
        token: token(data.email)
      });
      const res = await request.put("/api/v1/users/edit").send({
        email: data.email,
        username: "newuser"
      });
      res.status.should.equal(400);
      res.body.status.should.equal(status.FAIL);
      res.body.message.should.equal(errorresp.usernameTaken);
    });
  });
