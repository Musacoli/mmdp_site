import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';
import './index.scss';

export const TextInput = props => (
  <div className={`flex__item ${props.classNames || ''}`}>
    <Label label={props.inputLabel || ''} />
    <span className="block">
      <input
        className="input"
        type={props.type || ''}
        id={props.id || ''}
        name={props.name || ''}
        value={props.value || ''}
        onChange={props.change}
        placeholder={props.placeholder || ''}
      />
    </span>
  </div>
);


TextInput.propTypes = {
  classNames: PropTypes.string,
  inputLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
