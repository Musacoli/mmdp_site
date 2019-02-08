import cors from 'cors';
import keystone from 'keystone';
import validate from 'express-validation';
import aboutValidator from '../middleware/about';
import fileUploadValidator from '../middleware/fileUpload';
import apiResponse from '../middleware/apiResponse';
import middleware from '../middleware/events';
import validator from '../validation/validator';
import errorHandler from '../middleware/errorHandler';
import authorize from '../middleware/authorize';
import authenticate from '../middleware/authenticate';
import appendFilesToBody from '../middleware/appendFilesToBody';
import {
  checkEmail,
  parseRegistration,
  updateDetails,
  validateEmail,
  verifyAccount,
  verifyEdit,
} from '../middleware/userMiddlewares';

import {
  paramGroupExists,
  validateGroupCreate,
  validateGroupUpdate,
} from '../middleware/groupMiddlewares';

const importRoutes = keystone.importer(__dirname);

export const baseUrl = '/api/v1';

const aboutPath = `${baseUrl}/about`;

const App = (app) => {
  // Import Route Controllers
  const routes = {
    api: importRoutes('./api'),
  };

  app.use(cors());

  app.use(apiResponse);

  app.post(
    `${baseUrl}/auth/login`,
    [validate(validator.login)],
    routes.api.auth.index.login,
  );

  app.get('/', (req, res) => {
    res.json({ message: 'API endpoint for mmdp cms' });
  });

  app.post(
    `${aboutPath}/governor-message/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.governorMessage.create,
  );

  app.get(
    `${aboutPath}/governor-message/list`,
    [authenticate, authorize.cms.about.list, keystone.middleware.api],
    routes.api.governorMessage.list,
  );

  app.put(
    `${aboutPath}/governor-message/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.governorMessage.update,
  );

  app.get(
    `${aboutPath}/governor-message/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.governorMessage.get,
  );

  app.delete(
    `${aboutPath}/governor-message/:id/remove`,
    [authenticate, authorize.cms.about.delete, keystone.middleware.api],
    routes.api.governorMessage.remove,
  );

  app.post(
    `${aboutPath}/edo-state-approach/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.edoStateApproach.create,
  );

  app.get(
    `${aboutPath}/edo-state-approach/list`,
    [authenticate, authorize.cms.about.list, keystone.middleware.api],
    routes.api.edoStateApproach.list,
  );

  app.put(
    `${aboutPath}/edo-state-approach/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.edoStateApproach.update,
  );

  app.get(
    `${aboutPath}/edo-state-approach/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.edoStateApproach.get,
  );

  app.delete(
    `${aboutPath}/edo-state-approach/:id/remove`,
    [authenticate, authorize.cms.about.delete, keystone.middleware.api],
    routes.api.edoStateApproach.remove,
  );

  app.post(
    `${aboutPath}/objectives/create`,
    [authenticate, authorize.cms.about.create, keystone.middleware.api],
    aboutValidator.Objectives,
    routes.api.objectives.create,
  );

  app.get(
    `${aboutPath}/objectives/list`,
    [authenticate, authorize.cms.about.list, keystone.middleware.api],
    routes.api.objectives.list,
  );

  app.put(
    `${aboutPath}/objectives/:id/update`,
    keystone.middleware.api,
    [authenticate, authorize.cms.about.update, aboutValidator.Objectives],
    routes.api.objectives.update,
  );

  app.get(
    `${aboutPath}/objectives/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.objectives.get,
  );

  app.delete(
    `${aboutPath}/objectives/:id/remove`,
    [authenticate, authorize.cms.about.delete, keystone.middleware.api],
    routes.api.objectives.remove,
  );

  app.post(
    `${aboutPath}/coordination/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.coordination.create,
  );

  app.get(
    `${aboutPath}/coordination/list`,
    [authenticate, authorize.cms.about.list, keystone.middleware.api],
    routes.api.coordination.list,
  );

  app.put(
    `${aboutPath}/coordination/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.coordination.update,
  );

  app.get(
    `${aboutPath}/coordination/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.coordination.get,
  );

  app.delete(
    `${aboutPath}/coordination/:id/remove`,
    [authenticate, authorize.cms.about.delete, keystone.middleware.api],
    routes.api.coordination.remove,
  );

  app.post(
    `${aboutPath}/about-mmdp/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.create,
  );

  app.get(
    `${aboutPath}/about-mmdp/list`,
    [authenticate, authorize.cms.about.list, keystone.middleware.api],
    routes.api.about.list,
  );

  app.put(
    `${aboutPath}/about-mmdp/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.update,
  );

  app.get(
    `${aboutPath}/about-mmdp/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.get,
  );

  app.delete(
    `${aboutPath}/about-mmdp/:id/remove`,
    [authenticate, authorize.cms.about.delete, keystone.middleware.api],
    routes.api.about.remove,
  );

  app.get('/', (req, res) => {
    res.json({ message: 'API endpoint for mmdp cms' });
  });

  // users
  app.post(
    `${baseUrl}/users`,
    [authenticate, authorize.user.create, parseRegistration, checkEmail],
    routes.api.Users.createUser,
  );
  // the confirmation route is accessible by guests
  app.put(
    `${baseUrl}/users/confirmation`,
    verifyAccount,
    routes.api.Users.confirmed,
  );
  app.put(
    `${baseUrl}/users/`,
    [authenticate, authorize.user.update, validateEmail, updateDetails],
    routes.api.Users.updateEmail,
  );
  app.delete(`${baseUrl}/users/:id`, routes.api.Users.deleteUser);
  app.get(
    `${baseUrl}/users/:id`,
    [authenticate, authorize.user.get],
    routes.api.Users.fetchUser,
  );
  app.get(
    `${baseUrl}/users`,
    [authenticate, authorize.user.list],
    routes.api.Users.fetchAllUsers,
  );
  app.put(
    `${baseUrl}/users/edit`,
    [authenticate, verifyEdit],
    routes.api.Users.edited,
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
  app.post(
    `${baseUrl}/resources/report`,
    [appendFilesToBody, validate(validator.report)],
    routes.api.resources.report.create,
  );
  app.post(
    `${baseUrl}/file-upload`,
    fileUploadValidator.fileUpload,
    routes.api.fileUpload.create,
  );

  app.post(
    '/api/v1/events',
    [
      authenticate,
      authorize.events.create,
      middleware.eventsMiddlewares,
      keystone.middleware.api,
    ],
    routes.api.events.create,
  );

  app.get(
    '/api/v1/events',
    [authenticate, authorize.events.list, keystone.middleware.api],
    routes.api.events.list,
  );

  app.get(
    '/api/v1/events/:id',
    [authenticate, authorize.events.get, keystone.middleware.api],
    routes.api.events.get,
  );
  app.put(
    '/api/v1/events/:id',
    [authenticate, authorize.events.update, keystone.middleware.api],
    routes.api.events.update,
  );

  app.delete(
    '/api/v1/events/:id',
    [authenticate, authorize.events.delete, keystone.middleware.api],
    routes.api.events.remove,
  );

  app.use(errorHandler);
};

export default App;
