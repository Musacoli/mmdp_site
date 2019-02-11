import React from 'react';
import PropTypes from 'prop-types';

const FormHeader = ({ title, step, pages }) => {
  return (
    <React.Fragment>
      <span className="sh-title">{title}</span>
      <div className="row page-status">
        <div className="column inline-block-display">
          <div className="parallelogram in-active" />
        </div>
        <div className="column inline-block-display">
          <div className="parallelogram" />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <span className="st-label">
            {step} of {pages}
          </span>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string,
  step: PropTypes.number,
  pages: PropTypes.number,
};

export default FormHeader;
