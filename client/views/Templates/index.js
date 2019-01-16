import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';

const TemplateDefault = ({ children }) => (
  <React.Fragment>
    <Sidebar />
    {children}
  </React.Fragment>
);

TemplateDefault.propTypes = { children: PropTypes.element.isRequired };

export default TemplateDefault;
