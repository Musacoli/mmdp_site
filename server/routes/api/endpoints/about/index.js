import keystone from 'keystone';
import aboutValidator from '../../../../middleware/about';
import errorHandler from '../../../../middleware/errorHandler';
import authorize from '../../../../middleware/authorize';
import authenticate, {
  authOptional,
} from '../../../../middleware/authenticate';

export const baseUrl = '/api/v1';

const aboutPath = `${baseUrl}/about`;

const About = (app, routes) => {
  app.post(
    `${aboutPath}/governor-message/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.about.governorMessage.create,
  );

  app.get(
    `${aboutPath}/governor-message/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.governorMessage.list,
  );

  app.put(
    `${aboutPath}/governor-message/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.governorMessage,
    ],
    routes.api.about.governorMessage.update,
  );

  app.get(
    `${aboutPath}/governor-message/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.governorMessage.get,
  );

  app.post(
    `${aboutPath}/edo-state-approach/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.about.edoStateApproach.create,
  );

  app.get(
    `${aboutPath}/edo-state-approach/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.edoStateApproach.list,
  );

  app.put(
    `${aboutPath}/edo-state-approach/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.edoStateApproach,
    ],
    routes.api.about.edoStateApproach.update,
  );

  app.get(
    `${aboutPath}/edo-state-approach/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.edoStateApproach.get,
  );

  app.post(
    `${aboutPath}/objectives/create`,
    [authenticate, authorize.cms.about.create, keystone.middleware.api],
    aboutValidator.Objectives,
    routes.api.about.objectives.create,
  );

  app.get(
    `${aboutPath}/objectives/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.objectives.list,
  );

  app.put(
    `${aboutPath}/objectives/:id/update`,
    keystone.middleware.api,
    [authenticate, authorize.cms.about.update, aboutValidator.Objectives],
    routes.api.about.objectives.update,
  );

  app.get(
    `${aboutPath}/objectives/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.objectives.get,
  );

  app.post(
    `${aboutPath}/coordination/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.about.coordination.create,
  );

  app.get(
    `${aboutPath}/coordination/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.coordination.list,
  );

  app.put(
    `${aboutPath}/coordination/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.coordination,
    ],
    routes.api.about.coordination.update,
  );

  app.get(
    `${aboutPath}/coordination/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.coordination.get,
  );

  app.post(
    `${aboutPath}/about-mmdp/create`,
    [
      authenticate,
      authorize.cms.about.create,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.about.create,
  );

  app.get(
    `${aboutPath}/about-mmdp/list`,
    [authOptional, keystone.middleware.api],
    routes.api.about.about.list,
  );

  app.put(
    `${aboutPath}/about-mmdp/:id/update`,
    [
      authenticate,
      authorize.cms.about.update,
      keystone.middleware.api,
      aboutValidator.about,
    ],
    routes.api.about.about.update,
  );

  app.get(
    `${aboutPath}/about-mmdp/:id`,
    [authenticate, authorize.cms.about.get, keystone.middleware.api],
    routes.api.about.about.get,
  );

  app.use(errorHandler);
};

export default About;
