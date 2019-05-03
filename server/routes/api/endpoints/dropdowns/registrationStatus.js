import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const registrationStatusPath = `${baseUrl}/registration-status`;

const RegistrationStatus = (app, routes) => {
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
};
export default RegistrationStatus;
