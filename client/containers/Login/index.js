import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../../components/LoginView';
import { loginLoading } from '../../store/actions/auth/login';


export class Login extends Component {
  componentDidMount() {
    const { loginLoadingAction } = this.props;
    loginLoadingAction();
  }

  render() {
    const { loading } = this.props;
    return (
      <LoginView loading={loading} />
    );
  }
}

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginLoadingAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.login.loading,
});

const mapDispatchToProps = {
  loginLoadingAction: loginLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
