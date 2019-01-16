import path from 'path';
import keystone from 'keystone';

const importRoutes = keystone.importer(__dirname);


export default function (app) {
  const routes = {
    api: importRoutes('./api')
  };
  app.get('/api/users/', keystone.middleware.api, routes.api.user.list);
  app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
  });
}
