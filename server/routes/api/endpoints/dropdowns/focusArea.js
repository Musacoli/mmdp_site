import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const focusAreaPath = `${baseUrl}/focus-area`;

const FocusArea = (app, routes) => {
  /* ---------- Focus Area Dropdown ----------- */
  app.post(
    `${focusAreaPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      keystone.middleware.api,
      validate(validator.focusArea.focusArea),
    ],
    routes.api.dropdowns.focusArea.create,
  );

  app.get(
    `${focusAreaPath}`,
    [authOptional],
    routes.api.dropdowns.focusArea.list,
  );

  app.get(
    `${focusAreaPath}/:subTheme_id`,
    [authOptional],
    routes.api.dropdowns.focusArea.list,
  );

  app.put(
    `${focusAreaPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.focusArea.focusArea),
    ],
    routes.api.dropdowns.focusArea.updateMany,
  );

  app.put(
    `${focusAreaPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.focusArea.focusArea),
    ],
    routes.api.dropdowns.focusArea.update,
  );

  app.delete(
    `${focusAreaPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.focusArea.remove,
  );
};
export default FocusArea;
