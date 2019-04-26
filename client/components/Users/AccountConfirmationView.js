/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import logo from '../../assets/images/logo.svg';
import '../../assets/styles/Users/registration.scss';

export const AccountConfirmationView = ({ onSubmit, onChange, onCancel }) => (
  <div className="registration__container ">
    <div className="confirmation__form__header">
      <div className="confirm_form_logo">
        <img src={logo} alt="logo" title="mmdpLogo" id="mmdp__logo" />
      </div>
      <p className="header_desc">
        The Managing Migration through
        <br />
        Development Programme
      </p>
    </div>

    <form className="ui form" onSubmit={onSubmit}>
      <div className="confirmation__form">
        <div className="input__fields">
          <label htmlFor="firstName">First name</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="field form__input"
            onChange={onChange}
          />
        </div>
        <div className="input__fields">
          <label htmlFor="lastName">Last name</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            minLength="4"
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="input__fields">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            minLength="4"
            required
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="input__fields">
          <label htmlFor="phone">Phone number</label>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            minLength="4"
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="input__fields">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            minLength="4"
            required
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="input__fields">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength="4"
            required
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="registration__buttons">
          <button type="submit" className="ui button form__input" id="reg__btn">
            <span>Create Account</span>
          </button>
        </div>
        <div className="registration__buttons">
          <button
            className="ui button form__input"
            onClick={onCancel}
            type="submit"
            id="reg__btn_cancel"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default AccountConfirmationView;
