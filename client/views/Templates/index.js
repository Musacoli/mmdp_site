/* eslint import/no-named-as-default: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../containers/Sidebar';

const TemplateDefault = ({ children, title, ...props }) => (
  <React.Fragment>
    <Sidebar {...props} title={title}>
      {children}
    </Sidebar>
  </React.Fragment>
);

TemplateDefault.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

TemplateDefault.defaultProps = {
  title: '',
};

export default TemplateDefault;
