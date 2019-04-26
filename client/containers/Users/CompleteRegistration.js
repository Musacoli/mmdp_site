import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountConfirmationView from '../../components/Users/AccountConfirmationView';
import { completeRegistration } from '../../store/actions/auth/completeRegistration';

export class CompleteRegistration extends Component {
  componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    this.setState({ token });
  }

  state = {
    token: '',
    username: '',
    password: '',
    lastName: '',
    firstName: '',
    confirmPassword: '',
    phone: '',
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onCancelHandler = () => {
    const { history } = this.props;
    history.push('/login');
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { completeRegistration } = this.props;
    completeRegistration(this.state);
  };

  render() {
    const { history, success, groups } = this.props;
    const CordinationMUrl = `${
      process.env.MMDP_WEBSITE_URL
    }coordination-matrix.html`;

    if (success) {
      if (groups && groups.length <= 0) {
        window.location.href = CordinationMUrl;
      } else {
        history.push('/login');
      }
    }
    return (
      <>
        <AccountConfirmationView
          onChange={this.onChangeHandler}
          onSubmit={this.onSubmitHandler}
          onCancel={this.onCancelHandler}
        />
      </>
    );
  }
}

CompleteRegistration.propTypes = {
  completeRegistration: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  success: state.completeUserRegistration.success,
  groups: state.completeUserRegistration.groups,
});

const mapDispatchToProps = {
  completeRegistration,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompleteRegistration);
