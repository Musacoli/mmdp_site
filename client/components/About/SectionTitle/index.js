import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const SectionTitle = ({ title }) => (
  <div className="section__title">{title || ''}</div>
);

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
