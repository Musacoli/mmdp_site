import React from 'react';
import PropTypes from 'prop-types';

const FormHeader = ({ title, step, pages }) => {
  const arr = Array(pages)
    .fill(0)
    .map((x, y) => y);
  return (
    <React.Fragment>
      <span className="sh-title">{title}</span>
      <div className="row page-status">
        {arr.map((no) => {
          if (no + 1 === step) {
            return (
              <div key={`page${no}`} className="column inline-block-display">
                <div className="parallelogram" />
              </div>
            );
          }
          return (
            <div key={`page${no}`} className="column inline-block-display">
              <div className="parallelogram in-active" />
            </div>
          );
        })}
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
