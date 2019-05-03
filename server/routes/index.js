import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import keystone from 'keystone';
import errorHandler from '../middleware/errorHandler';
import apiResponse from '../middleware/apiResponse';
import About from './api/endpoints/about';
import Dropdowns from './api/endpoints/dropdowns';
import CMS from './api/endpoints/cms';
import Resources from './api/endpoints/resources';
import Stakeholders from './api/endpoints/stakeholders';
import Users from './api/endpoints/users';

const swaggerDoc = YAML.load('./documentation.yml');

const importRoutes = keystone.importer(__dirname);

const App = (app) => {
  const routes = {
    api: importRoutes('./api'),
  };
  app.use(cors());
  app.use(apiResponse);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(errorHandler);
  About(app, routes);
  Dropdowns(app, routes);
  CMS(app, routes);
  Resources(app, routes);
  Stakeholders(app, routes);
  Users(app, routes);
};

export default App;
