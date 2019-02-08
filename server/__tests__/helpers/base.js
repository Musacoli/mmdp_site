/* eslint-disable */
import faker from 'faker';
import supertest from 'supertest';
import keystone from './keystone/index';
import Group from '../../models/Group';
import { User } from '../../models/User';
import { generateToken } from './auth';

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
 * generated fields.
 *
 * @param permissions
 * @param overrides
 * @returns {{permissions: Array, name: *}}
 */
export const makeGroup = (permissions = [], overrides = {}) => {
  return {
    name: faker.name.jobTitle(), // unique
    permissions,
    ...overrides,
  };
};

/**
 * Create a group with randomly generated details. Provide permissions that
 * the group should have. Use the overrides object to override any of the randomly
 * generated fields.
 *
 * @param permissions
 * @param overrides
 * @returns {Promise<*>}
 */
export const createGroup = async (permissions = [], overrides = {}) => {
  return await Group.model.create(makeGroup(permissions, overrides));
};

/**
 * Create randomly generated user details. Provide permissions that the user
 * should have. Use the overrides object to override any of the randomly
 * generated fields.
 *
 * @param permissions
 * @param overrides
 * @returns {Promise<{user details}>}
 */
export const makeUser = async (permissions = [], overrides = {}) => {
  const group = await createGroup(permissions);

  const data = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.internet.userName(), // unique
    phone: faker.phone.phoneNumber('07########'),
    email: faker.internet.email(), // unique
    password: faker.internet.password(),
    confirmed: faker.random.boolean(),
    groups: group ? [group._id] : [],
  };

  return { ...data, ...overrides };
};

/**
 * Create a user with randomly generated details. Provide permissions that the
 * user should have. Use the overrides object to override any of the randomly
 * generated fields.
 *
 * @param permissions
 * @param overrides
 * @returns {Promise<*>}
 */
export const createUser = async (permissions = [], overrides = {}) => {
  return await User.model.create(await makeUser(permissions, overrides));
};

/**
 * Removes all instances of specified model created by tests. This is to ensure
 * a test can be run without worrying about duplication or other likely
 * database inconsistencies.
 *
 * @param model
 * @returns {Promise<void>}
 */
export const removeAllModels = async (model) => {
  await model.model.remove({});
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
  await removeAllModels(Group);
  await removeAllModels(User);
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
    user.groups = [group._id];
    user.save();
    this.token = generateToken(user.toObject());
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
   * Make a get request with the authorization header (token) set if a user is
   * logged in.
   *
   * @param url
   * @returns {*}
   */
  static get(url) {
    const request = this.app.get(url);

    if (this.token) {
      return request.set('authorization', `Bearer ${this.token}`);
    }
    return request;
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

    if (this.token) {
      return request.set('authorization', `Bearer ${this.token}`);
    }
    return request;
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

    if (this.token) {
      return request.set('authorization', `Bearer ${this.token}`);
    }

    return request;
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

    if (this.token) {
      return request.set('authorization', `Bearer ${this.token}`);
    }

    return request;
  }
}
