import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/Label/index.scss';

const Label = ({ label }) => <span className="block text">{label || ''}</span>;

Label.propTypes = {
  label: PropTypes.string,
};

export default Label;
