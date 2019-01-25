import cors from 'cors';
import keystone from 'keystone';
import validate from 'express-validation';
import aboutValidator from '../middlewares/about';
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
import { paramGroupExists, validateGroupData } from '../middlewares/groupMiddlewares';
import authorize from '../middlewares/authorize';

const importRoutes = keystone.importer(__dirname);

export const baseUrl = '/api/v1';

const aboutPath = '/api/v1/about';

const App = (app) => {
  // Import Route Controllers
  const routes = {
    api: importRoutes('./api'),
  };

  app.use(cors());

  app.use(
    '/api/v1/auth/login',
    [apiResponse, validate(validator.login)],
    routes.api.auth.index.login,
  );

  app.get('/', (req, res) => {
    res.json({ message: 'API endpoint for mmdp cms' });
  });

  app.post(
    `${aboutPath}/governor-message/create`,
    keystone.middleware.api,
    aboutValidator.governorMessage,
    routes.api.governorMessage.create,
  );

  app.get(
    `${aboutPath}/governor-message/list`,
    keystone.middleware.api,
    routes.api.governorMessage.list,
  );

  app.put(
    `${aboutPath}/governor-message/:id/update`,
    keystone.middleware.api,
    aboutValidator.governorMessage,
    routes.api.governorMessage.update,
  );

  app.get(
    `${aboutPath}/governor-message/:id`,
    keystone.middleware.api,
    routes.api.governorMessage.get,
  );

  app.delete(
    `${aboutPath}/governor-message/:id/remove`,
    keystone.middleware.api,
    routes.api.governorMessage.remove,
  );

  app.post(
    `${aboutPath}/edo-state-approach/create`,
    keystone.middleware.api,
    aboutValidator.edoStateApproach,
    routes.api.edoStateApproach.create,
  );

  app.get(
    `${aboutPath}/edo-state-approach/list`,
    keystone.middleware.api,
    routes.api.edoStateApproach.list,
  );

  app.put(
    `${aboutPath}/edo-state-approach/:id/update`,
    keystone.middleware.api,
    aboutValidator.edoStateApproach,
    routes.api.edoStateApproach.update,
  );

  app.get(
    `${aboutPath}/edo-state-approach/:id`,
    keystone.middleware.api,
    routes.api.edoStateApproach.get,
  );

  app.delete(
    `${aboutPath}/edo-state-approach/:id/remove`,
    keystone.middleware.api,
    routes.api.edoStateApproach.remove,
  );

  app.post(
    `${aboutPath}/objectives/create`,
    keystone.middleware.api,
    aboutValidator.Objectives,
    routes.api.objectives.create,
  );

  app.get(
    `${aboutPath}/objectives/list`,
    keystone.middleware.api,
    routes.api.objectives.list,
  );

  app.put(
    `${aboutPath}/objectives/:id/update`,
    keystone.middleware.api,
    aboutValidator.Objectives,
    routes.api.objectives.update,
  );

  app.get(
    `${aboutPath}/objectives/:id`,
    keystone.middleware.api,
    routes.api.objectives.get,
  );

  app.delete(
    `${aboutPath}/objectives/:id/remove`,
    keystone.middleware.api,
    routes.api.objectives.remove,
  );

  app.post(
    `${aboutPath}/coordination/create`,
    keystone.middleware.api,
    aboutValidator.coordination,
    routes.api.coordination.create,
  );

  app.get(
    `${aboutPath}/coordination/list`,
    keystone.middleware.api,
    routes.api.coordination.list,
  );

  app.put(
    `${aboutPath}/coordination/:id/update`,
    keystone.middleware.api,
    aboutValidator.coordination,
    routes.api.coordination.update,
  );

  app.get(
    `${aboutPath}/coordination/:id`,
    keystone.middleware.api,
    routes.api.coordination.get,
  );

  app.delete(
    `${aboutPath}/coordination/:id/remove`,
    keystone.middleware.api,
    routes.api.coordination.remove,
  );

  app.post(
    `${aboutPath}/about-mmdp/create`,
    keystone.middleware.api,
    aboutValidator.about,
    routes.api.about.create,
  );

  app.get(
    `${aboutPath}/about-mmdp/list`,
    keystone.middleware.api,
    routes.api.about.list,
  );

  app.put(
    `${aboutPath}/about-mmdp/:id/update`,
    keystone.middleware.api,
    aboutValidator.about,
    routes.api.about.update,
  );

  app.get(
    `${aboutPath}/about-mmdp/:id`,
    keystone.middleware.api,
    routes.api.about.get,
  );

  app.delete(
    `${aboutPath}/about-mmdp/:id/remove`,
    keystone.middleware.api,
    routes.api.about.remove,
  );

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

  app.post(`${baseUrl}/users`, parseRegistration, checkEmail, routes.api.Users.createUser);
  app.put(`${baseUrl}/users/confirmation`, verifyAccount, routes.api.Users.confirmed);
  app.put(`${baseUrl}/users/`, validateEmail, updateDetails, routes.api.Users.updateEmail);
  app.delete(`${baseUrl}/users/:id`, routes.api.Users.deleteUser);
  app.get(`${baseUrl}/users/:id`, routes.api.Users.fetchUser);
  app.get(`${baseUrl}/users`, routes.api.Users.fetchAllUsers);
  app.put(`${baseUrl}/users/edit`, verifyEdit, routes.api.Users.edited);

  app.get(
    '/api/groups',
    [authorize.group.list],
    routes.api.group.list,
  );
  app.get(
    '/api/groups/:id',
    [authorize.group.get, paramGroupExists],
    routes.api.group.get,
  );
  app.post(
    '/api/groups/',
    [authorize.group.create, validateGroupData],
    routes.api.group.create,
  );
  app.put(
    '/api/groups/:id',
    [authorize.group.update, paramGroupExists, validateGroupData],
    routes.api.group.update,
  );
  app.delete(
    '/api/groups/:id',
    [authorize.group.delete, paramGroupExists],
    routes.api.group.remove,
  );
  app.get(
    '/api/permissions',
    [authorize.permission.list],
    routes.api.permission.list,
  );

  app.use(errorHandler);
};

export default App;
