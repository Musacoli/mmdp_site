import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const thematicPillarsDropdownPath = `${baseUrl}/thematic-pillars`;

const ThematicPillars = (app, routes) => {
  // Thematic pillars
  app.post(
    `${thematicPillarsDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      validate(validator.thematicPillars.addThermaticPillar),
    ],
    routes.api.dropdowns.thematicPillars.create,
  );

  app.get(
    `${thematicPillarsDropdownPath}/:id`,
    [authOptional],
    routes.api.dropdowns.thematicPillars.get,
  );

  app.get(
    `${thematicPillarsDropdownPath}`,
    [authOptional],
    routes.api.dropdowns.thematicPillars.list,
  );

  app.put(
    `${thematicPillarsDropdownPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.thematicPillars.updateThermaticPillar),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.thematicPillars.update,
  );
  app.put(
    `${thematicPillarsDropdownPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      validate(validator.thematicPillars.updateManyThermaticPillars),
      keystone.middleware.api,
    ],
    routes.api.dropdowns.thematicPillars.updateMany,
  );
  app.delete(
    `${thematicPillarsDropdownPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.thematicPillars.remove,
  );
};
export default ThematicPillars;
