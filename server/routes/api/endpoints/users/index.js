import validate from 'express-validation';
import validator from '../../../../validation';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate from '../../../../middleware/authenticate';
import {
  checkEmail,
  parseRegistration,
  updateDetails,
  validateEmail,
  verifyAccount,
  verifyEdit,
} from '../../../../middleware/user';
import {
  paramGroupExists,
  validateGroupCreate,
  validateGroupUpdate,
} from '../../../../middleware/group';

export const baseUrl = '/api/v1';

const Users = (app, routes) => {
  app.post(
    `${baseUrl}/auth/login`,
    validate(validator.login),
    routes.api.auth.login,
  );

  // users
  app.post(
    `${baseUrl}/users`,
    [authenticate, authorize.user.create, parseRegistration, checkEmail],
    routes.api.users.createUser,
  );
  // the confirmation route is accessible by guests
  app.put(
    `${baseUrl}/users/confirmation`,
    verifyAccount,
    routes.api.users.confirmed,
  );
  app.put(
    `${baseUrl}/users/`,
    [authenticate, authorize.user.update, validateEmail, updateDetails],
    routes.api.users.updateEmail,
  );
  app.delete(
    `${baseUrl}/users/:username`,
    [authenticate, authorize.user.delete],
    routes.api.users.deleteUser,
  );
  app.get(
    `${baseUrl}/users/:username`,
    [authenticate, authorize.user.get],
    routes.api.users.fetchUser,
  );
  app.get(
    `${baseUrl}/users`,
    [authenticate, authorize.user.list],
    routes.api.users.fetchAllUsers,
  );
  app.put(
    `${baseUrl}/users/edit`,
    [authenticate, verifyEdit],
    routes.api.users.edited,
  );

  // groups
  app.get(
    '/api/groups',
    [authenticate, authorize.group.list],
    routes.api.group.list,
  );
  app.get(
    '/api/groups/:id',
    [authenticate, authorize.group.get, paramGroupExists],
    routes.api.group.get,
  );
  app.post(
    '/api/groups/',
    [authenticate, validateGroupCreate, authorize.group.create],
    routes.api.group.create,
  );
  app.put(
    '/api/groups/:id',
    [
      authenticate,
      authorize.group.update,
      paramGroupExists,
      validateGroupUpdate,
    ],
    routes.api.group.update,
  );
  app.delete(
    '/api/groups/:id',
    [authenticate, authorize.group.delete, paramGroupExists],
    routes.api.group.remove,
  );

  // permissions
  app.get(
    '/api/permissions',
    [authenticate, authorize.permission.list],
    routes.api.permission.list,
  );

  app.use(errorHandler);
};

export default Users;
