import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';
const LGA = (app, routes) => {
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
};
export default LGA;
