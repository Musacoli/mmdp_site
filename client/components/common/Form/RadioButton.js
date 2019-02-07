import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({
  name,
  value,
  label,
  onChange,
  className,
  checked,
  ...restProps
}) => (
  <div className={`form__radio-group ${className}`}>
    <input
      type="radio"
      value={value}
      name={name}
      id={value}
      className="form__radio-input"
      onChange={onChange}
      checked={checked}
      {...restProps}
    />
    <label htmlFor={value} className="form__radio-label">
      <span className="form__radio-button" />
      {label}
    </label>
  </div>
);

RadioButton.defaultProps = {
  checked: false,
  className: '',
};

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default RadioButton;
