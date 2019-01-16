import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../../components/LoginView.jsx';
import { loginLoading } from '../../store/actions/auth/login';


export class Login extends Component {
  componentDidMount() {
    this.props.loginLoading();
  }

  render() {
    return (
      <LoginView loading={this.props.loading} />
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginLoading: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.login.loading
});

const mapDispatchToProps = {
  loginLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
