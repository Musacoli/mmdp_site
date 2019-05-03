import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const Country = (app, routes) => {
  // Country
  app.get(
    `${baseUrl}/country`,
    [authOptional],
    routes.api.dropdowns.country.list,
  );
  // Country
  app.post(
    `${baseUrl}/country`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.country.addCountry),
    ],
    routes.api.dropdowns.country.create,
  );
  // Country
  app.put(
    `${baseUrl}/country`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.country.addCountry),
    ],
    routes.api.dropdowns.country.updateMany,
  );

  app.delete(
    `${baseUrl}/country/:id`,
    [authenticate, authorize.cms.dropdowns.delete],
    routes.api.dropdowns.country.remove,
  );

  // get country based on the id
  app.get(
    `${baseUrl}/country/:id`,
    [authOptional],
    routes.api.dropdowns.country.get,
  );

  // Country
  app.get(
    `${baseUrl}/country`,
    [authOptional],
    routes.api.dropdowns.country.list,
  );
};
export default Country;
