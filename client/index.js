import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { store } from './store';
import './assets/styles/index.scss';
import './assets/css/users/index.scss';
import './assets/css/users/containers/user-containers.scss';
import './assets/styles/main.scss';
import './assets/css/users/user-containers.scss';

const app = (
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
