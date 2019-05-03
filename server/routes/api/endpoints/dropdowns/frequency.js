import keystone from 'keystone';
import validate from 'express-validation';
import validator from '../../../../validation';
import authorize from '../../../../middleware/authorize';
import authenticate from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const FrequencyPath = `${baseUrl}/frequency`;

const Frequency = (app, routes) => {
  /* ---------- Frequency Dropdown ----------- */
  app.post(
    `${FrequencyPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.create,
      keystone.middleware.api,
      validate(validator.frequency.frequencyNew),
    ],
    routes.api.dropdowns.Frequency.create,
  );

  app.get(
    `${FrequencyPath}`,
    [authenticate, authorize.cms.dropdowns.create],
    routes.api.dropdowns.Frequency.list,
  );

  app.put(
    `${FrequencyPath}/:id`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.frequency.frequencyNew),
    ],
    routes.api.dropdowns.Frequency.update,
  );

  app.put(
    `${FrequencyPath}`,
    [
      authenticate,
      authorize.cms.dropdowns.update,
      keystone.middleware.api,
      validate(validator.frequency.frequencyNew),
    ],
    routes.api.dropdowns.Frequency.updateMany,
  );

  app.delete(
    `${FrequencyPath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.Frequency.remove,
  );
};
export default Frequency;
