import validate from 'express-validation';
import validator from '../../../../validation';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';
import appendFilesToBody from '../../../../middleware/appendFilesToBody';
import { checkIfDocument } from '../../../../middleware/repository/validateDocument';
import { paramDocExists } from '../../../../middleware/document';
import { paramMediaExists } from '../../../../middleware/media';
import fileUploadValidator from '../../../../middleware/fileUpload';

export const baseUrl = '/api/v1';

const Resources = (app, routes) => {
  app.post(
    `${baseUrl}/file-upload`,
    fileUploadValidator.fileUpload,
    routes.api.file.create,
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

  app.use(errorHandler);
};

export default Resources;
