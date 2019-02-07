import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container } from 'semantic-ui-react';

const MainContent = ({ children, title }) => (
  <div className="pusher">
    <div className="ui menu heading borderless">
      <div className="item openbtn">
        <i className="icon content" />
      </div>
      <div className="item">
        <Container>
          <Header className="sidebar-header" as="h1">
            {title}
          </Header>
        </Container>
      </div>
    </div>
    <div className="ui container">{children}</div>
  </div>
);

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
export default MainContent;
