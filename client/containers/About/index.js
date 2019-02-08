import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import Template from '../../views/Templates';

const About = (props) => (
  <Template {...props} title="About blah blah">
    <div>
      {routes.map((route) => (
        <Route
          exact={route.exact}
          path={route.path}
          component={route.component}
          key={route.path}
        />
      ))}
    </div>
  </Template>
);

About.propTypes = {};

export default About;
