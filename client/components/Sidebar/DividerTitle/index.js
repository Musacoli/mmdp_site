import React from 'react';
import PropTypes from 'prop-types';

const DividerTitle = ({ title }) => (
  <div className="item divider__title">
    <span>{title}</span>
  </div>
);

DividerTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DividerTitle;
