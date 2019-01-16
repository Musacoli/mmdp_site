import path from 'path';
import keystone from 'keystone';
import aboutValidator from '../middlewares/about';

const importRoutes = keystone.importer(__dirname);


// Import Route Controllers
const routes = {
  api: importRoutes('./api')  
};

const aboutPath = '/api/v1/about';

exports = module.exports = function(app) {
  app.post(
    `${aboutPath}/governor-message/create`, 
    keystone.middleware.api, 
    aboutValidator.governorMessage,
    routes.api.governorMessage.create
  );

  app.get(
    `${aboutPath}/governor-message/list`, 
    keystone.middleware.api, 
    routes.api.governorMessage.list
  );

  app.put(
    `${aboutPath}/governor-message/:id/update`, 
    keystone.middleware.api, 
    aboutValidator.governorMessage,
    routes.api.governorMessage.update
  );

  app.get(
    `${aboutPath}/governor-message/:id`, 
    keystone.middleware.api, 
    routes.api.governorMessage.get
  );

  app.delete(
    `${aboutPath}/governor-message/:id/remove`, 
    keystone.middleware.api, 
    routes.api.governorMessage.remove
  );

  app.post(
    `${aboutPath}/edo-state-approach/create`, 
    keystone.middleware.api, 
    routes.api.edoStateApproach.create
  );

  app.get(
    `${aboutPath}/edo-state-approach/list`, 
    keystone.middleware.api, 
    routes.api.edoStateApproach.list
  );

  app.put(
    `${aboutPath}/edo-state-approach/:id/update`, 
    keystone.middleware.api, 
    routes.api.edoStateApproach.update
  );

  app.get(
    `${aboutPath}/edo-state-approach/:id`, 
    keystone.middleware.api, 
    routes.api.edoStateApproach.get
  );

  app.delete(
    `${aboutPath}/edo-state-approach/:id/remove`, 
    keystone.middleware.api, 
    routes.api.edoStateApproach.remove
  );

  app.post(
    `${aboutPath}/objectives/create`, 
    keystone.middleware.api, 
    routes.api.objectives.create
  );

  app.get(
    `${aboutPath}/objectives/list`, 
    keystone.middleware.api, 
    routes.api.objectives.list
  );

  app.put(
    `${aboutPath}/objectives/:id/update`, 
    keystone.middleware.api, 
    routes.api.objectives.update
  );

  app.get(
    `${aboutPath}/objectives/:id`, 
    keystone.middleware.api, 
    routes.api.objectives.get
  );

  app.delete(
    `${aboutPath}/objectives/:id/remove`, 
    keystone.middleware.api, 
    routes.api.objectives.remove
  );

  app.post(
    `${aboutPath}/coordination/create`, 
    keystone.middleware.api, 
    routes.api.coordination.create
  );

  app.get(
    `${aboutPath}/coordination/list`, 
    keystone.middleware.api, 
    routes.api.coordination.list
  );

  app.put(
    `${aboutPath}/coordination/:id/update`, 
    keystone.middleware.api, 
    routes.api.coordination.update
  );

  app.get(
    `${aboutPath}/coordination/:id`, 
    keystone.middleware.api, 
    routes.api.coordination.get
  );

  app.delete(
    `${aboutPath}/coordination/:id/remove`, 
    keystone.middleware.api, 
    routes.api.coordination.remove
  );

}
