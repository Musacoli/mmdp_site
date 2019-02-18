import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FileInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  className,
  ...restProps
}) => (
  <div className={`field ${className}`}>
    <label htmlFor={name}>{label}</label>
    <div className="form__file-area">
      <input
        name={name}
        className="form__file-input"
        type="file"
        onChange={onChange}
        {...restProps}
      />
      <span
        className={classNames('form__custom-file-input', {
          'form__custom-file-filled': value.length,
        })}
      >
        {value && value.length ? value : placeholder}
      </span>
    </div>
  </div>
);

FileInput.defaultProps = {
  label: 'Upload file',
  placeholder: 'Select a file',
  className: '',
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default FileInput;
