import React from 'react';
import PropTypes from 'prop-types';

const FormNotesTextarea = ({ value, handleChange }) => {
  return (
    <div className="row">
      <div className="column">
        <textarea
          placeholder="Enter message"
          className="st-textarea"
          id="notes"
          name="notes"
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

FormNotesTextarea.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func,
};

export default FormNotesTextarea;
