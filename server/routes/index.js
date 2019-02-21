import cors from 'cors';
import keystone from 'keystone';
import validate from 'express-validation';
import aboutValidator from '../middleware/about';
import fileUploadValidator from '../middleware/fileUpload';
import apiResponse from '../middleware/apiResponse';
import middleware from '../middleware/events';
import validator from '../validation';
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
import { checkIfDocument } from '../middleware/repository/validateDocument';
import {
  paramGroupExists,
  validateGroupCreate,
  validateGroupUpdate,
} from '../middleware/groupMiddlewares';
import { paramDocExists } from '../middleware/documents';
import { paramMediaExists } from '../middleware/media';

import validators from '../middleware/pillar_middleware';
import stakeholdersDirectoryValidator from '../middleware/stakeholdersDirectory';

const importRoutes = keystone.importer(__dirname);

export const baseUrl = '/api/v1';

const aboutPath = `${baseUrl}/about`;
const stakeholdersPath = `${baseUrl}/stakeholders-directory`;

const App = (app) => {
  // Import Route Controllers
  const routes = {
    api: importRoutes('./api'),
  };

  app.use(cors());

  app.use(apiResponse);

  app.post(
    `${baseUrl}/auth/login`,
    validate(validator.login),
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
    `${baseUrl}/file-upload`,
    fileUploadValidator.fileUpload,
    routes.api.fileUpload.create,
  );

  app.post(
    '/api/v1/events',
    [
      authenticate,
      authorize.cms.events.create,
      middleware.eventsMiddlewares,
      keystone.middleware.api,
    ],
    routes.api.events.create,
  );

  app.get(
    '/api/v1/events',
    [authenticate, authorize.cms.events.list, keystone.middleware.api],
    routes.api.events.list,
  );

  app.get(
    '/api/v1/events/:id',
    [authenticate, authorize.cms.events.get, keystone.middleware.api],
    routes.api.events.get,
  );
  app.put(
    '/api/v1/events/:id',
    [authenticate, authorize.cms.events.update, keystone.middleware.api],
    routes.api.events.update,
  );

  app.delete(
    '/api/v1/events/:id',
    [authenticate, authorize.cms.events.delete, keystone.middleware.api],
    routes.api.events.remove,
  );
  // Pillars
  app.get(
    '/api/v1/pillars/',
    [authenticate, authorize.cms.pillar.list, keystone.middleware.api],
    routes.api.pillar.list,
  );
  app.get(
    '/api/v1/pillars/:id',
    [authenticate, authorize.cms.pillar.get, keystone.middleware.api],
    routes.api.pillar.get,
  );
  app.get(
    '/api/v1/pillars/pillar-number/:id',
    [authenticate, authorize.cms.pillar.get, keystone.middleware.api],
    routes.api.pillar.getByPillarNumber,
  );

  app.post(
    '/api/v1/pillars/',
    [
      authenticate,
      authorize.cms.pillar.create,
      validators.Pillar,
      keystone.middleware.api,
    ],
    routes.api.pillar.create,
  );
  app.put(
    '/api/v1/pillars/:id/update',
    [
      authenticate,
      authorize.cms.pillar.update,
      validators.Pillar,
      keystone.middleware.api,
    ],
    routes.api.pillar.update,
  );
  app.delete(
    '/api/v1/pillars/:id/delete',
    [authenticate, authorize.cms.pillar.delete, keystone.middleware.api],
    routes.api.pillar.remove,
  );

  app.post(
    `${baseUrl}/resources/repository/media`,
    [
      authenticate,
      authorize.cms.resources.create,
      appendFilesToBody,
      validate(validator.media),
    ],
    routes.api.resources.media.create,
  );

  app.get(
    `${baseUrl}/resources/repository/media`,
    [authenticate, authorize.cms.resources.list],
    routes.api.resources.media.list,
  );

  app.get(
    `${baseUrl}/resources/repository/media/:id`,
    [authenticate, authorize.cms.resources.get, paramMediaExists],
    routes.api.resources.media.getOne,
  );

  app.delete(
    `${baseUrl}/resources/repository/media/:id`,
    [authenticate, authorize.cms.resources.delete, paramMediaExists],
    routes.api.resources.media.deleteMedia,
  );

  app.post(
    `${baseUrl}/resources/repository/document`,
    [
      authenticate,
      authorize.cms.resources.create,
      appendFilesToBody,
      validate(validator.document),
    ],
    routes.api.resources.document.create,
  );

  app.put(
    `${baseUrl}/resources/repository/document/:id`,
    [
      authenticate,
      authorize.cms.resources.update,
      paramDocExists,
      appendFilesToBody,
      validate(validator.document.editDocument),
    ],
    routes.api.resources.document.update,
  );

  app.get(
    `${baseUrl}/resources/repository/document`,
    [authenticate, authorize.cms.resources.get],
    routes.api.resources.document.list,
  );

  app.get(
    `${baseUrl}/resources/repository/document/:id`,
    [authenticate, authorize.cms.resources.get, paramDocExists],
    routes.api.resources.document.getOne,
  );

  app.patch(
    `${baseUrl}/resources/repository/archive/:id`,
    [authenticate, authorize.cms.resources.archive, checkIfDocument],
    routes.api.resources.archiveDocument.archive,
  );

  app.delete(
    `${baseUrl}/resources/repository/:id`,
    [authenticate, authorize.cms.resources.delete, checkIfDocument],
    routes.api.resources.deleteDocument.deleteDocument,
  );

  // resources report
  app.post(
    `${baseUrl}/resources/reports`,
    [
      authenticate,
      authorize.cms.resources.create,
      appendFilesToBody,
      validate(validator.report.addReport),
    ],
    routes.api.resources.report.create,
  );

  // returns the list including archived reports. Strictly for admin
  app.get(
    `${baseUrl}/resources/reports/all`,
    [authenticate, authorize.cms.resources.get],
    routes.api.resources.report.list,
  );

  // returns the list without archived reports. Will be used for the website
  app.get(
    `${baseUrl}/resources/reports`,
    [authenticate, authorize.cms.resources.get],
    routes.api.resources.report.list,
  );

  app.get(
    `${baseUrl}/resources/reports/:id`,
    [authenticate, authorize.cms.resources.get],
    routes.api.resources.report.get,
  );

  app.patch(
    `${baseUrl}/resources/reports/:id/archive`,
    [authenticate, authorize.cms.resources.archive],
    routes.api.resources.report.archive,
  );

  app.patch(
    `${baseUrl}/resources/reports/:id/unarchive`,
    [authenticate, authorize.cms.resources.archive],
    routes.api.resources.report.archive,
  );

  app.put(
    `${baseUrl}/resources/reports/:id`,
    [
      authenticate,
      authorize.cms.resources.update,
      appendFilesToBody,
      validate(validator.report.updateReport),
    ],
    routes.api.resources.report.update,
  );

  app.delete(
    `${baseUrl}/resources/reports/:id`,
    [authenticate, authorize.cms.resources.delete],
    routes.api.resources.report.remove,
  );

  // resources research
  app.post(
    `${baseUrl}/resources/research`,
    [
      authenticate,
      authorize.cms.resources.create,
      appendFilesToBody,
      validate(validator.research.addResearch),
    ],
    routes.api.resources.research.create,
  );

  app.get(
    `${baseUrl}/resources/research`,
    [authenticate, authorize.cms.resources.list],
    routes.api.resources.research.list,
  );

  app.get(
    `${baseUrl}/resources/research/:id`,
    [authenticate, authorize.cms.resources.get],
    routes.api.resources.research.retrieve,
  );
  app.put(
    `${baseUrl}/resources/research/:id`,
    [authenticate, authorize.cms.resources.update],
    routes.api.resources.research.update,
  );
  app.delete(
    `${baseUrl}/resources/research/:id`,
    [authenticate, authorize.cms.resources.delete],
    routes.api.resources.research.remove,
  );

  /* ---------- Stakeholders Directory ----------- */
  app.post(
    `${stakeholdersPath}/create`,
    authenticate,
    authorize.cms.stakeholders.create,
    stakeholdersDirectoryValidator,
    keystone.middleware.api,
    routes.api.stakeholdersDirectory.create,
  );

  app.get(
    `${stakeholdersPath}/list`,
    authenticate,
    authorize.cms.stakeholders.list,
    keystone.middleware.api,
    routes.api.stakeholdersDirectory.list,
  );

  app.put(
    `${stakeholdersPath}/:id/update`,
    authenticate,
    authorize.cms.stakeholders.update,
    keystone.middleware.api,
    stakeholdersDirectoryValidator,
    routes.api.stakeholdersDirectory.update,
  );

  app.get(
    `${stakeholdersPath}/:id`,
    authenticate,
    authorize.cms.stakeholders.get,
    keystone.middleware.api,
    routes.api.stakeholdersDirectory.get,
  );

  app.delete(
    `${stakeholdersPath}/:id/remove`,
    authenticate,
    authorize.cms.stakeholders.delete,
    keystone.middleware.api,
    routes.api.stakeholdersDirectory.remove,
  );
  /* ---------- Stakeholders Directory ----------- */

  app.use(errorHandler);
};

export default App;
