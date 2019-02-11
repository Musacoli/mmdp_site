import React from 'react';
import PropTypes from 'prop-types';

const FormLabels = ({ label1, label2 }) => {
  return (
    <div className="row row-label">
      <div className="seven wide column">
        <span className="st-label">{label1}</span>
      </div>
      <div className="eight wide column">
        <span className="st-label">{label2}</span>
      </div>
    </div>
  );
};

FormLabels.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
};

export default FormLabels;
