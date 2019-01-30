import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'Semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import GovernorMessage from './GovernorMessage';
import routes from './routes';
import Template from '../../views/Templates';
import './index.scss';

const About = props => (
  <Template {...props} title="">
    <div>
      {routes.map(route => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
    </div>
  </Template>
);

About.propTypes = {};

export default About;
