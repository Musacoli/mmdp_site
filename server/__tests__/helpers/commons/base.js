/* eslint-disable no-underscore-dangle */
import faker from 'faker';
import supertest from 'supertest';
import keystone from '.';
import Group from '../../../models/Group';
import User from '../../../models/User';
import { generateToken } from './jwt';

faker.seed(5711);

/**
 * Use faker to generate random test data. All test helpers requiring fake data
 * should make use of this utility. Using "import faker from 'faker';" on each
 * and every file where it is required has the potential to cause generation
 * of duplicate data. This can break tests in an unpredictable fashion
 * which is hard to debug.
 */
export { faker };

/**
 * Create randomly generated group details. Provide permissions that the group
 * should have. Use the overrides object to override any of the randomly
 * generated fields. The times argument defines the number of group
 * data objects to be created.
 *
 * @param permissions
 * @param overrides
 * @param times
 * @returns {{permissions: Array, name: *}}
 */
export const makeGroup = (permissions = [], overrides = {}, times = 1) => {
  const groupData = [];

  for (let i = 0; i < times; i++) {
    groupData.push({
      name: `${faker.random.uuid()}-${faker.name.jobTitle()}`, // unique
      permissions,
      ...overrides,
    });
  }
  return times === 1 ? groupData[0] : groupData;
};

/**
 * Create a group with randomly generated details. Provide permissions that the
 * group should have. Use the overrides object to override any of the randomly
 * generated fields. The times argument defines the number of group objects
 * to be created.
 *
 * @param permissions
 * @param overrides
 * @param times
 * @returns {Promise<*>}
 */
export const createGroup = async (
  permissions = [],
  overrides = {},
  times = 1,
) => {
  const groups = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    groups.push(await Group.model.create(makeGroup(permissions, overrides)));
  }
  return times === 1 ? groups[0] : groups;
};

/**
 * Create randomly generated user details. Provide permissions that the user
 * should have. Use the overrides object to override any of the randomly
 * generated fields. The times argument defines the number of user
 * data objects to be created.
 *
 * @param permissions
 * @param overrides
 * @param times
 * @returns {Promise<{user details}>}
 */
export const makeUser = async (permissions = [], overrides = {}, times = 1) => {
  const userData = [];
  const group = await createGroup(permissions);
  for (let i = 0; i < times; i++) {
    userData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: `${faker.random.uuid()}-${faker.internet.userName()}`, // unique
      phone: faker.phone.phoneNumber('07########'),
      email: `${faker.random.uuid()}-${faker.internet.userName()}@mmdp.com`, // unique
      password: faker.internet.password(),
      confirmed: faker.random.boolean(),
      groups: group ? [group._id] : [],
      ...overrides,
    });
  }

  return times === 1 ? userData[0] : userData;
};

/**
 * Create a user with randomly generated details. Provide permissions that the
 * user should have. Use the overrides object to override any of the randomly
 * generated fields. The times argument defines the number of user objects
 * to be created.
 *
 * @param permissions
 * @param overrides
 * @param times
 * @returns {Promise<*>}
 */
export const createUser = async (
  permissions = [],
  overrides = {},
  times = 1,
) => {
  const users = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    users.push(await User.model.create(await makeUser(permissions, overrides)));
  }
  return times === 1 ? users[0] : users;
};

/**
 * Converts a collection or an array of collections to the respective
 * object representation.
 *
 * @param data
 * @returns {*}
 */
export const collectionToObject = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => item.toObject());
  }

  return data.toObject();
};

/**
 * Removes all collections of specified model created by tests. This is to ensure
 * a test can be run without worrying about duplication or other likely
 * database inconsistencies.
 *
 * @param model
 * @returns {Promise<void>}
 */
export const removeAllCollections = async (model) => {
  try {
    await model.model.remove({});
  } catch (e) {
    console.log(model);
  }
};

/**
 * Removes all groups and users created by tests. This helps to ensure a test
 * can be run from a clean start without risking unwanted duplicates and
 * other inconsistencies. This is very useful for tests that make use
 * of app.login(), app.loginRandom(), createUser() and
 * createGroup().
 *
 * @returns {Promise<void>}
 */
export const removeAllGroupsAndUsers = async () => {
  await removeAllCollections(Group);
  await removeAllCollections(User);
};

export class app {
  static token = null;

  /**
   * Login a user by passing an existing user object. Also, specify the user
   * permissions. Behind the scenes it creates a group with the permissions
   * and attaches the user to it.
   *
   * @param user
   * @param permissions
   * @returns {Promise<void>}
   */
  static async login(user, permissions = []) {
    const group = await createGroup(permissions);
    const userToLogin = user;
    userToLogin.groups = [group._id];
    userToLogin.save();
    this.token = generateToken(userToLogin.toObject());
  }

  /**
   * Login a randomly generated user that has the permissions provided. Behind
   * the scenes it creates a group with the permissions and attaches the
   * user to it.
   *
   * @param permissions
   * @returns {Promise<void>}
   */
  static async loginRandom(permissions = []) {
    this.token = generateToken((await createUser(permissions)).toObject());
  }

  /**
   * Call this method to logout the currently logged in user.
   */
  static logout() {
    this.token = null;
  }

  static app = supertest(keystone.app);

  /**
   * Add authorization header to the specified supertest request object.
   * @param request
   * @returns {*}
   * @private
   */
  static __addAuthorization(request) {
    return this.token
      ? request.set('authorization', `Bearer ${this.token}`)
      : request;
  }

  /**
   * Make a get request with the authorization header (token) set if a user is
   * logged in.
   *
   * @param url
   * @returns {*}
   */
  static get(url) {
    const request = this.app.get(url);

    return app.__addAuthorization(request);
  }

  /**
   * Make a post request with the authorization header (token) set if a user is
   * logged in.
   *
   * @param url
   * @returns {*}
   */
  static post(url) {
    const request = this.app.post(url);

    return app.__addAuthorization(request);
  }

  /**
   * Make a put request with the authorization header (token) set if a user is
   * logged in.
   *
   * @param url
   * @returns {*}
   */
  static put(url) {
    const request = this.app.put(url);

    return app.__addAuthorization(request);
  }

  /**
   * Make a delete request with the authorization header (token) set if a user is
   * logged in.
   *
   * @param url
   * @returns {*}
   */
  static delete(url) {
    const request = this.app.delete(url);

    return app.__addAuthorization(request);
  }

  static patch(url) {
    const request = this.app.patch(url);

    return app.__addAuthorization(request);
  }
}
