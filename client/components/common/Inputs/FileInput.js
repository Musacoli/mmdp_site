import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import '../../../assets/styles/Inputs/index.scss';

export const FileInput = ({
  id,
  name,
  value,
  classNames,
  change,
  inputLabel,
  placeholder,
}) => (
  <div className={`flex__item ${classNames || ''}`}>
    <Label htmlFor={id} label={inputLabel || ''} />
    <span className="block file__wrapper">
      <input
        className="input"
        type="file"
        id={id || ''}
        name={name || ''}
        value={value || ''}
        onChange={change}
      />
      <label className="file__label" htmlFor={id || ''}>
        {placeholder || ''}
      </label>
    </span>
  </div>
);

FileInput.propTypes = {
  classNames: PropTypes.string,
  inputLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default FileInput;
