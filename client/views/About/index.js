import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';

import './index.scss';

const AboutTemplate = ({ children }) => (
  <div className="form__area">
    <div className="form">
      {children}
    </div>
  </div>
);

AboutTemplate.propTypes = { children: PropTypes.object.isRequired };

export default AboutTemplate;
