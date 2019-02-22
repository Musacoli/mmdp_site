import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const MainContent = ({ children, title }) => (
  <div className="pusher">
    <div className="ui menu heading borderless">
      <div className="item openbtn">
        <i className="icon content" />
      </div>
      <div>
        <Container>
          <div className="content-header">{title}</div>
        </Container>
      </div>
    </div>
    <div className="ui container main-content">{children}</div>
  </div>
);

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default MainContent;
