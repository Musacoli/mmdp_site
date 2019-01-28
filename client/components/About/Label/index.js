import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Label = props => (
  <span className="block text">
    {props.label || ''}
  </span>
);

Label.propTypes = {
  label: PropTypes.string,
};

export default Label;
