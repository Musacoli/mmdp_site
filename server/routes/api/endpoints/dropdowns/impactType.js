import keystone from 'keystone';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const impactTypePath = `${baseUrl}/impact-type`;

const ImpactType = (app, routes) => {
  // impact type
  app.post(
    `${impactTypePath}`,
    [authenticate, authorize.cms.dropdowns.create],
    routes.api.dropdowns.impactType.create,
  );

  app.get(
    `${impactTypePath}`,
    [authOptional],
    routes.api.dropdowns.impactType.list,
  );

  app.get(
    `${impactTypePath}/:_id`,
    [authOptional],
    routes.api.dropdowns.impactType.list,
  );

  app.put(
    `${impactTypePath}`,
    [authenticate, authorize.cms.dropdowns.update, keystone.middleware.api],
    routes.api.dropdowns.impactType.updateMany,
  );
  app.put(
    `${impactTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.update, keystone.middleware.api],
    routes.api.dropdowns.impactType.update,
  );
  app.delete(
    `${impactTypePath}/:id`,
    [authenticate, authorize.cms.dropdowns.delete, keystone.middleware.api],
    routes.api.dropdowns.impactType.remove,
  );
};
export default ImpactType;
