import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/Button/index.scss';

/* eslint-disable react/button-has-type */
const Button = ({ classNames, loading, click, type, name }) => (
  <div className={`button__area ${classNames || ''}`}>
    <button
      disabled={loading || false}
      onClick={click || null}
      type={type || 'submit'}
    >
      {loading ? <i className="spinner loading icon" /> : name}
    </button>
  </div>
);

Button.propTypes = {
  classNames: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
  click: PropTypes.func,
  name: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
