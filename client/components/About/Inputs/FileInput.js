import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import './index.scss';

export const FileInput = (props) => (
  <div className={`flex__item ${props.classNames || ''}`}>
    <Label label={props.inputLabel || ''} />
    <span className="block file__wrapper">
      <input 
        className="input"
        type="file" 
        id={props.id || ''}
        name={props.name || ''}
        value={props.value || ''}
        onChange={props.change}
      />
      <label className="file__label" htmlFor={props.id || ''}>
        {props.placeholder || ''}
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


