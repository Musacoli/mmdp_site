import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const wardDropdownPath = `${baseUrl}/ward`;

const Ward = (app, routes) => {
  // Ward resources
  app.post(
    `${wardDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.ward.addWard),
    ],
    routes.api.dropdowns.ward.create,
  );

  app.get(
    `${wardDropdownPath}`,
    [authOptional],
    routes.api.dropdowns.ward.list,
  );

  app.get(
    `${wardDropdownPath}/:lga_id`,
    [authOptional],
    routes.api.dropdowns.ward.list,
  );

  app.put(
    `${wardDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.ward.addWard),
    ],
    routes.api.dropdowns.ward.updateMany,
  );
  app.put(
    `${wardDropdownPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.ward.addWard),
    ],
    routes.api.dropdowns.ward.update,
  );
  app.delete(
    `${wardDropdownPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.ward.remove,
  );
};
export default Ward;
