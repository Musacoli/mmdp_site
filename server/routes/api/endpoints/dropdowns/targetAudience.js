import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const dropdownsPath = `${baseUrl}/dropdowns`;

const TargetAudience = (app, routes) => {
  /* ---------- Target Audience Dropdown ----------- */
  app.post(
    `${dropdownsPath}/target-audience/create`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.targetAudience),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.targetAudience.create,
  );

  app.get(
    `${dropdownsPath}/target-audience`,
    [authOptional],
    routes.api.dropdowns.targetAudience.list,
  );

  app.get(
    `${dropdownsPath}/target-audience/:id`,
    [authenticate, authorize.cms.dropdowns.get, keystone.middleware.api],
    routes.api.dropdowns.targetAudience.get,
  );

  app.put(
    `${dropdownsPath}/target-audience/update`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.targetAudience),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.targetAudience.update,
  );

  app.delete(
    `${dropdownsPath}/target-audience/:id/remove`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.targetAudience.remove,
  );

  /* ---------- Target Audience Dropdown ----------- */
};
export default TargetAudience;
