import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const subThemePath = `${baseUrl}/sub-theme`;

const SubTheme = (app, routes) => {
  /* ---------- Sub Theme Dropdown ----------- */
  app.post(
    `${subThemePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.subTheme.addSubTheme),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.subTheme.create,
  );

  app.get(
    `${subThemePath}`,
    [authOptional],
    routes.api.dropdowns.subTheme.list,
  );

  app.get(
    `${subThemePath}/:thematicPillar_id`,
    [authOptional],
    routes.api.dropdowns.subTheme.list,
  );

  app.put(
    `${subThemePath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.subTheme.addSubTheme),
    ],
    routes.api.dropdowns.subTheme.updateMany,
  );
  app.put(
    `${subThemePath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.subTheme.addSubTheme),
    ],
    routes.api.dropdowns.subTheme.update,
  );
  app.delete(
    `${subThemePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.subTheme.remove,
  );
};
export default SubTheme;
