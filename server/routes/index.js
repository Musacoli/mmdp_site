import cors from 'cors';
import keystone from 'keystone';
import validate from 'express-validation';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import aboutValidator from '../middleware/about';
import fileUploadValidator from '../middleware/fileUpload';
import apiResponse from '../middleware/apiResponse';
import middleware from '../middleware/event';
import validator from '../validation';
import errorHandler from '../middleware/errorHandler';
import authorize from '../middleware/authorize';
import authenticate, { authOptional } from '../middleware/authenticate';
import appendFilesToBody from '../middleware/appendFilesToBody';
import {
  checkEmail,
  parseRegistration,
  updateDetails,
  validateEmail,
  verifyAccount,
  verifyEdit,
} from '../middleware/user';
import { checkIfDocument } from '../middleware/repository/validateDocument';
import {
  paramGroupExists,
  validateGroupCreate,
  validateGroupUpdate,
} from '../middleware/group';
import { paramDocExists } from '../middleware/document';
import { paramMediaExists } from '../middleware/media';

import validators from '../middleware/pillar';
import {
  stakeHolderMiddleware,
  ReturneeServiceMiddleware,
} from '../middleware/stakeholdersDirectory';

const importRoutes = keystone.importer(__dirname);

export const baseUrl = '/api/v1';

const aboutPath = `${baseUrl}/about`;
const stakeholdersPath = `${baseUrl}/stakeholders-directory`;
const stateDropdownPath = `${baseUrl}/state`;
const registrationStatusPath = `${baseUrl}/registration-status`;
const partnershipTypePath = `${baseUrl}/partnership-type`;
const beneficiaryTypePath = `${baseUrl}/beneficiary-type`;

const swaggerDoc = YAML.load('./documentation.yml');

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
    routes.api.auth.login,
  );

  app.get('/', (req, res) => {
    res.json({ message: 'MMDP CMS API v1' });
  });

  app.post(
    `${aboutPath}/governor-message/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.about.governorMessage.create,
  );

  app.get(
    `${aboutPath}/governor-message/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.governorMessage.list,
  );

  app.put(
    `${aboutPath}/governor-message/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.about.governorMessage.update,
  );

  app.get(
    `${aboutPath}/governor-message/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.governorMessage.get,
  );

  app.post(
    `${aboutPath}/edo-state-approach/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.about.edoStateApproach.create,
  );

  app.get(
    `${aboutPath}/edo-state-approach/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.edoStateApproach.list,
  );

  app.put(
    `${aboutPath}/edo-state-approach/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.about.edoStateApproach.update,
  );

  app.get(
    `${aboutPath}/edo-state-approach/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.edoStateApproach.get,
  );

  app.post(
    `${aboutPath}/objectives/create`,
    [authenticate, authorize.cms.about.create, keystone.middleware.api],
    aboutValidator.Objectives,
    routes.api.about.objectives.create,
  );

  app.get(
    `${aboutPath}/objectives/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.objectives.list,
  );

  app.put(
    `${aboutPath}/objectives/:id/update`,
    keystone.middleware.api,
    [authenticate, authorize.cms.about.update, aboutValidator.Objectives],
    routes.api.about.objectives.update,
  );

  app.get(
    `${aboutPath}/objectives/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.objectives.get,
  );

  app.post(
    `${aboutPath}/coordination/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.about.coordination.create,
  );

  app.get(
    `${aboutPath}/coordination/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.coordination.list,
  );

  app.put(
    `${aboutPath}/coordination/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.about.coordination.update,
  );

  app.get(
    `${aboutPath}/coordination/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.coordination.get,
  );

  app.post(
    `${aboutPath}/about-mmdp/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.about.create,
  );

  app.get(
    `${aboutPath}/about-mmdp/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.about.list,
  );

  app.put(
    `${aboutPath}/about-mmdp/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.about.update,
  );

  app.get(
    `${aboutPath}/about-mmdp/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.about.get,
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
  app.post(
    `${baseUrl}/file-upload`,
    fileUploadValidator.fileUpload,
    routes.api.file.create,
  );
  // events
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
    [authOptional, keystone.middleware.api],
    routes.api.events.list,
  );

  app.get(
    '/api/v1/events/:id',
    [authOptional, keystone.middleware.api],
    routes.api.events.get,
  );

  app.patch(
    '/api/v1/events/:id/archive',
    [authenticate, authorize.cms.events.update, keystone.middleware.api],
    routes.api.events.archive,
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
    [authenticate, authorize.cms.pillar.view, keystone.middleware.api],
    routes.api.pillar.list,
  );
  app.get(
    '/api/v1/pillars/:id',
    [authenticate, authorize.cms.pillar.view, keystone.middleware.api],
    routes.api.pillar.get,
  );
  app.get(
    '/api/v1/pillars/pillar-number/:id',
    [authOptional, keystone.middleware.api],
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
    '/api/v1/pillars/:id',
    [authenticate, authorize.cms.pillar.delete, keystone.middleware.api],
    routes.api.pillar.remove,
  );

  app.post(
    `${baseUrl}/resources/repository/media`,
    [
      authenticate,
      authorize.cms.resources.create,
      appendFilesToBody,
      validate(validator.media.addMedia),
    ],
    routes.api.resources.media.create,
  );

  app.get(
    `${baseUrl}/resources/repository/media`,
    [authOptional],
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
      validate(validator.document.addDocument),
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
    [authOptional],
    routes.api.resources.document.list,
  );

  app.get(
    `${baseUrl}/resources/repository/document/:id`,
    [authenticate, authorize.cms.resources.get, paramDocExists],
    routes.api.resources.document.getOne,
  );

  app.patch(
    `${baseUrl}/resources/repository/document/:id/archive`,
    [authenticate, authorize.cms.resources.archive, checkIfDocument],
    routes.api.resources.document.archive,
  );

  app.delete(
    `${baseUrl}/resources/repository/document/:id`,
    [authenticate, authorize.cms.resources.delete, checkIfDocument],
    routes.api.resources.document.remove,
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

  app.get(
    `${baseUrl}/resources/reports`,
    [authOptional],
    routes.api.resources.report.list,
  );

  app.get(
    `${baseUrl}/resources/reports/:type`,
    [authOptional],
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
    [authOptional],
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
    `${stakeholdersPath}`,
    authenticate,
    authorize.cms.stakeholders.create,
    stakeHolderMiddleware,
    keystone.middleware.api,
    routes.api.resources.stakeholders.stakeholders.create,
  );

  app.get(
    `${stakeholdersPath}`,
    [authOptional, keystone.middleware.api],
    routes.api.resources.stakeholders.stakeholders.list,
  );

  app.put(
    `${stakeholdersPath}/:id`,
    [
      authenticate,
      authorize.cms.stakeholders.update,
      keystone.middleware.api,
      stakeHolderMiddleware,
    ],
    routes.api.resources.stakeholders.stakeholders.update,
  );

  app.delete(
    `${stakeholdersPath}/:id`,
    [authenticate, authorize.cms.stakeholders.delete, keystone.middleware.api],
    routes.api.resources.stakeholders.stakeholders.remove,
  );
  /* ---------- Stakeholders Directory ----------- */
  /* ---------- Returnee Service -----------------*/
  app.get(
    `${stakeholdersPath}/:stakeholder_id/beneficiaries`,
    [authOptional, keystone.middleware.api],
    routes.api.resources.stakeholders.returneeService.list,
  );

  app.post(
    `${stakeholdersPath}/:stakeholder_id/beneficiaries`,
    authenticate,
    authorize.cms.stakeholders.create,
    ReturneeServiceMiddleware,
    keystone.middleware.api,
    routes.api.resources.stakeholders.returneeService.create,
  );

  app.put(
    `${stakeholdersPath}/:beneficiary_id/beneficiaries/`,
    authenticate,
    authorize.cms.stakeholders.update,
    ReturneeServiceMiddleware,
    keystone.middleware.api,
    routes.api.resources.stakeholders.returneeService.update,
  );

  app.delete(
    `${stakeholdersPath}/:beneficiary_id/beneficiaries`,
    authenticate,
    authorize.cms.stakeholders.delete,
    keystone.middleware.api,
    routes.api.resources.stakeholders.returneeService.remove,
  );

  // LGA Dropdown Endpoints
  app.post(
    `${baseUrl}/dropdowns/LGA`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      keystone.middleware.api,
      validate(validator.LGA.validateLGA),
    ],
    routes.api.dropdowns.LGA.create,
  );
  app.get(
    `${baseUrl}/dropdowns/LGA`,
    [authenticate, authorize.cms.dropdowns.get, keystone.middleware.api],
    routes.api.dropdowns.LGA.list,
  );

  app.get(
    `${baseUrl}/dropdowns/LGA/:state_id`,
    [authenticate, authorize.cms.dropdowns.get, keystone.middleware.api],
    routes.api.dropdowns.LGA.get,
  );

  app.put(
    `${baseUrl}/dropdowns/LGA`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.LGA.validateLGA),
    ],
    routes.api.dropdowns.LGA.update,
  );
  app.delete(
    `${baseUrl}/dropdowns/LGA/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.LGA.remove,
  );

  /* ---------- Returnee Service -----------------*/

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  /* ---------- Dropdowns ------------------- */
  // Country
  app.get(
    `${baseUrl}/country`,
    [authOptional],
    routes.api.dropdowns.country.list,
  );
  // State resources
  app.post(
    `${stateDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.state.addState),
    ],
    routes.api.dropdowns.state.create,
  );

  app.get(
    `${stateDropdownPath}`,
    [authOptional],
    routes.api.dropdowns.state.list,
  );

  app.get(
    `${stateDropdownPath}/:country_id`,
    [authOptional],
    routes.api.dropdowns.state.list,
  );

  app.put(
    `${stateDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.state.addState),
    ],
    routes.api.dropdowns.state.updateMany,
  );
  app.put(
    `${stateDropdownPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.state.addState),
    ],
    routes.api.dropdowns.state.update,
  );
  app.delete(
    `${stateDropdownPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.state.remove,
  );

  // partnership Types
  app.post(
    `${partnershipTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.partnershipType.partnershipType),
    ],
    routes.api.dropdowns.partnershipType.create,
  );

  app.get(
    `${partnershipTypePath}`,
    [authOptional],
    routes.api.dropdowns.partnershipType.list,
  );

  app.put(
    `${partnershipTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.partnershipType.partnershipType),
    ],
    routes.api.dropdowns.partnershipType.updateMany,
  );
  app.delete(
    `${partnershipTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.partnershipType.remove,
  );

  /* Registration Status Dropdown */

  app.post(
    `${registrationStatusPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.status.addRegStatus),
    ],
    routes.api.dropdowns.registrationStatus.create,
  );

  app.get(
    `${registrationStatusPath}`,
    [authOptional],
    routes.api.dropdowns.registrationStatus.list,
  );

  app.put(
    `${registrationStatusPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.status.addRegStatus),
    ],
    routes.api.dropdowns.registrationStatus.updateMany,
  );
  app.put(
    `${registrationStatusPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.state.addState),
    ],
    routes.api.dropdowns.registrationStatus.update,
  );
  app.delete(
    `${registrationStatusPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.registrationStatus.remove,
  );

  /* Beneficiary Type dropdown */

  app.post(
    `${beneficiaryTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.create,
  );

  app.get(
    `${beneficiaryTypePath}`,
    [authOptional],
    routes.api.dropdowns.beneficiaryType.list,
  );

  app.put(
    `${beneficiaryTypePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.updateMany,
  );
  app.put(
    `${beneficiaryTypePath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.beneficiaryType.addBeneficiaryType),
    ],
    routes.api.dropdowns.beneficiaryType.update,
  );
  app.delete(
    `${beneficiaryTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.beneficiaryType.remove,
  );

  app.use(errorHandler);
};

export default App;
