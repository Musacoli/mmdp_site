/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logo.svg';
import './styles.css';

export const LoginView = ({ onSubmit, onChange }) => (
  <div className="form__container ">
    <div className="login__description">
      <img src={logo} alt="logo" title="mmdpLogo" id="mmdp__logo" />
      <p className="form__desc">
        The Managing Migration through
        <br />
        Development Programme
      </p>
    </div>
    <form className="ui form " onSubmit={onSubmit}>
      <div className="form__holder">
        <div className="input__field">
          <label htmlFor="username">Username/Email</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            className="field form__input"
            placeholder="Enter Username or Email"
            onChange={onChange}
            required
          />
        </div>
        <div className="input__field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            minLength="4"
            onChange={onChange}
            className="field form__input"
          />
        </div>
        <div className="login__container">
          <button type="submit" className="ui button form__input" id="login__btn">
            <span id="sign__text">Sign in</span>
          </button>
          <div id="forgot__password__container">
            <Link to="/">
              <p>Forgot password?</p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default LoginView;
