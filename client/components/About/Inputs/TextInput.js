import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import './index.scss';

export const TextInput = ({
  id,
  name,
  value,
  type,
  classNames,
  change,
  inputLabel,
  placeholder,
}) => (
  <div className={`flex__item ${classNames || ''}`}>
    <Label htmlFor={id} label={inputLabel || ''} />
    <span className="block">
      <input
        className="input"
        type={type || ''}
        id={id || ''}
        name={name || ''}
        value={value || ''}
        onChange={change}
        placeholder={placeholder || ''}
      />
    </span>
  </div>
);

TextInput.propTypes = {
  classNames: PropTypes.string,
  inputLabel: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default TextInput;
