import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const OrganizationType = (app, routes) => {
  /* Organization Types Dropdown */
  app.post(
    `${baseUrl}/organizationTypes`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.organizationTypes),
    ],
    routes.api.dropdowns.organizationType.create,
  );
  app.get(
    `${baseUrl}/organizationTypes`,
    [authOptional],
    routes.api.dropdowns.organizationType.list,
  );
  app.put(
    `${baseUrl}/organizationTypes`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.organizationTypes),
    ],
    routes.api.dropdowns.organizationType.update,
  );
  app.delete(
    `${baseUrl}/organizationTypes/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.organizationType.remove,
  );
};
export default OrganizationType;
