import keystone from 'keystone';
import validate from 'express-validation';
import apiResponse from '../middleware/apiResponse';
import validator from '../validation/validator';
import errorHandler from '../middleware/errorHandler';
import {
  checkIfAdmin,
  requireUser,
  checkEmail,
  parseRegistration,
  updateDetails,
  validateEmail,
  verifyAccount,
  verifyEdit,
} from '../middlewares/userMiddlewares';

const importRoutes = keystone.importer(__dirname);

export const baseUrl = '/api/v1';

export default function (app) {
  const routes = {
    api: importRoutes('./api'),
  };

  app.get('/', (req, res) => {
    res.json({ message: 'API endpoint for mmdp cms' });
  });

  app.use('/api/v1/auth/login', [apiResponse, validate(validator.login)], routes.api.auth.index.login);

  app.post(
    `${baseUrl}/users`,
    parseRegistration,
    checkEmail,
    routes.api.Users.createUser,
  );
  app.put(
    `${baseUrl}/users/confirmation`,
    verifyAccount,
    routes.api.Users.confirmed,
  );
  app.put(
    `${baseUrl}/users/`,
    validateEmail,
    updateDetails,
    routes.api.Users.updateEmail,
  );
  app.delete(`${baseUrl}/users/:id`, routes.api.Users.deleteUser);
  app.get(`${baseUrl}/users/:id`, routes.api.Users.fetchUser);
  app.get(`${baseUrl}/users`, routes.api.Users.fetchAllUsers);
  app.put(
    `${baseUrl}/users/edit`,
    verifyEdit,
    routes.api.Users.edited,
  );

  app.use(errorHandler);
}
