import keystone from 'keystone';
import middleware from '../../../../middleware/event';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';
import validators from '../../../../middleware/pillar';

const CMS = (app, routes) => {
  // events
  app.post(
    '/api/v1/events',
    [
      authenticate,
      authorize.cms.events.create,
      middleware.eventsMiddlewares,
      keystone.middleware.api,
    ],
    routes.api.events.create,
  );

  app.get(
    '/api/v1/events',
    [authOptional, keystone.middleware.api],
    routes.api.events.list,
  );

  app.get(
    '/api/v1/events/:id',
    [authOptional, keystone.middleware.api],
    routes.api.events.get,
  );

  app.patch(
    '/api/v1/events/:id/archive',
    [authenticate, authorize.cms.events.update, keystone.middleware.api],
    routes.api.events.archive,
  );

  app.put(
    '/api/v1/events/:id',
    [authenticate, authorize.cms.events.update, keystone.middleware.api],
    routes.api.events.update,
  );

  app.delete(
    '/api/v1/events/:id',
    [authenticate, authorize.cms.events.delete, keystone.middleware.api],
    routes.api.events.remove,
  );
  // Pillars
  app.get(
    '/api/v1/pillars/',
    [authenticate, authorize.cms.pillar.view, keystone.middleware.api],
    routes.api.pillar.list,
  );
  app.get(
    '/api/v1/pillars/:id',
    [authenticate, authorize.cms.pillar.view, keystone.middleware.api],
    routes.api.pillar.get,
  );
  app.get(
    '/api/v1/pillars/pillar-number/:id',
    [authOptional, keystone.middleware.api],
    routes.api.pillar.getByPillarNumber,
  );

  app.post(
    '/api/v1/pillars/',
    [
      authenticate,
      authorize.cms.pillar.create,
      validators.Pillar,
      keystone.middleware.api,
    ],
    routes.api.pillar.create,
  );
  app.put(
    '/api/v1/pillars/:id/update',
    [
      authenticate,
      authorize.cms.pillar.update,
      validators.Pillar,
      keystone.middleware.api,
    ],
    routes.api.pillar.update,
  );
  app.delete(
    '/api/v1/pillars/:id',
    [authenticate, authorize.cms.pillar.delete, keystone.middleware.api],
    routes.api.pillar.remove,
  );

  app.use(errorHandler);
};

export default CMS;
