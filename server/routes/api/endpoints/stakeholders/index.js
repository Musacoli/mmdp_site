import keystone from 'keystone';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

import { stakeHolderMiddleware } from '../../../../middleware/stakeholdersDirectory';

export const baseUrl = '/api/v1';

const stakeholdersPath = `${baseUrl}/stakeholders-directory`;

const Stakeholders = (app, routes) => {
  /* ---------- Stakeholders Directory ----------- */
  app.post(
    `${stakeholdersPath}`,
    authenticate,
    authorize.cms.stakeholders.create,
    stakeHolderMiddleware,
    keystone.middleware.api,
    routes.api.resources.stakeholders.stakeholders.create,
  );

  app.get(
    `${stakeholdersPath}`,
    [authOptional, keystone.middleware.api],
    routes.api.resources.stakeholders.stakeholders.list,
  );

  app.put(
    `${stakeholdersPath}/:id`,
    [
      authenticate,
      authorize.cms.stakeholders.update,
      keystone.middleware.api,
      stakeHolderMiddleware,
    ],
    routes.api.resources.stakeholders.stakeholders.update,
  );
  app.delete(
    `${stakeholdersPath}/:id`,
    [authenticate, authorize.cms.stakeholders.delete, keystone.middleware.api],
    routes.api.resources.stakeholders.stakeholders.remove,
  );
  /* ---------- Stakeholders Directory ----------- */
  app.use(errorHandler);
};

export default Stakeholders;
