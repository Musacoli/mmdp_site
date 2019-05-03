import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const stateDropdownPath = `${baseUrl}/state`;

const State = (app, routes) => {
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
};
export default State;
