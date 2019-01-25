/* eslint import/no-named-as-default: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Header } from 'semantic-ui-react';
import Sidebar from '../../containers/Sidebar';

const TemplateDefault = ({ children, title, ...props }) => (
  <React.Fragment>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Sidebar {...props} />
        </Grid.Column>
        <Grid.Column widescreen="12">
          <Container className="main-content">
            <Header as="h1">{title}</Header>
            <div className="content-container">
              {children}
            </div>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>


  </React.Fragment>
);

TemplateDefault.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default TemplateDefault;
