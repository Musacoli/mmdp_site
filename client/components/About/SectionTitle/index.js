import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const SectionTitle = props => (
  <div className="section__title">
    {props.title || ''}
  </div>
);

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;
