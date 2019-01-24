import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { store } from './store';
import './assets/index.sass';
import '../client/components/Users/index.sass';
import '../client/containers/Users/index.sass';

const app = (
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map(route => (
          <Route exact path={route.path} component={route.component} key={route.path} />
        ))}
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
