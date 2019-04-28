import React from 'react';
import logo from '../../assets/images/logo.svg';
import '../../assets/styles/Users/updateprofile.scss';

const updateProfileForm = ({
  onSubmit,
  onChange,
  onCancel,
  lastName,
  firstName,
  username,
  phone,
}) => (
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
            value={firstName}
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
            value={lastName}
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
            onChange={onChange}
            className="field form__input"
            value={username}
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
            value={phone}
            onChange={onChange}
            className="field form__input"
          />
        </div>

        <div className="registration__buttons">
          <button type="submit" className="ui button form__input" id="reg__btn">
            <span>Update Profile</span>
          </button>
        </div>

        <div className="registration__buttons">
          <button
            className="ui button form__input"
            onClick={onCancel}
            id="reg__btn_cancel"
            type="submit"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default updateProfileForm;
