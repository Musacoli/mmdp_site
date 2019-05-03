import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const dropdownsPath = `${baseUrl}/dropdowns`;

const StaffStrength = (app, routes) => {
  app.post(
    `${dropdownsPath}/staff-strength/create`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.staffStrength),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.staffStrength.create,
  );

  app.get(
    `${dropdownsPath}/staff-strength`,
    [authOptional],
    routes.api.dropdowns.staffStrength.list,
  );

  app.get(
    `${dropdownsPath}/staff-strength/:id`,
    [authenticate, authorize.cms.dropdowns.get, keystone.middleware.api],
    routes.api.dropdowns.staffStrength.get,
  );

  app.put(
    `${dropdownsPath}/staff-strength/update`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.staffStrength),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.staffStrength.update,
  );

  app.delete(
    `${dropdownsPath}/staff-strength/:id/remove`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.staffStrength.remove,
  );
};
export default StaffStrength;
