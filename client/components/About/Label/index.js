import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Label = ({ label }) => <span className="block text">{label || ''}</span>;

Label.propTypes = {
  label: PropTypes.string,
};

export default Label;
