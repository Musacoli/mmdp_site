import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginViewForm from '../../components/LoginView/LoginView';
import { loginUser } from '../../store/actions/auth/login';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(email);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { loginUser: LoginUserAction } = this.props;
    const { username, password } = this.state;
    if (this.validateEmail(username)) {
      const newEmailState = {
        email: username,
        password,
      };
      LoginUserAction(newEmailState);
    } else {
      const data = this.state;
      LoginUserAction(data);
    }
  };

  render() {
    return (
      <LoginViewForm onSubmit={this.onFormSubmit} onChange={this.onChange} />
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Login: state.response,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
