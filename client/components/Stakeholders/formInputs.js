import React from 'react';
import PropTypes from 'prop-types';

const FormInputs = ({
  id1,
  name1,
  value1,
  id2,
  name2,
  value2,
  handleChange,
}) => {
  return (
    <div className="row">
      <div className="seven wide column">
        <input
          className="st-input"
          id={id1}
          name={name1}
          onChange={handleChange}
          value={value1}
        />
      </div>
      <div className="eight wide column">
        <input
          className="st-input"
          id={id2}
          name={name2}
          onChange={handleChange}
          value={value2}
          required
        />
      </div>
    </div>
  );
};

FormInputs.propTypes = {
  id1: PropTypes.number,
  id2: PropTypes.number,
  name1: PropTypes.string,
  name2: PropTypes.string,
  value1: PropTypes.string,
  value2: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FormInputs;
