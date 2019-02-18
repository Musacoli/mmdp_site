import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutUser } from '../../store/actions/auth/login';

export class LogOut extends Component {
  componentWillMount = () => {
    // eslint-disable-next-line no-shadow
    const { history, logOutUser } = this.props;
    logOutUser();
    localStorage.removeItem('userToken');
    history.push('/login');
  };

  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.loginReducer,
});

const mapDispatchToProps = {
  logOutUser,
};

LogOut.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  loginStatus: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogOut);
