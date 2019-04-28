import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdateProfileForm from '../../components/Users/UpdateProfile';
import { updateUserProfile, fetchUserByToken } from '../../store/sagas/users';

export class UpdateProfile extends Component {
  state = {
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
  };

  componentWillMount() {
    const { fetchUserByToken } = this.props;
    fetchUserByToken();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { user } = nextProps;
      if (user) {
        this.setState({
          username: user.username ? user.username : '',
          firstName: user.first_name ? user.first_name : '',
          lastName: user.last_name ? user.last_name : '',
          phone: user.phone ? user.phone : '',
          email: user.email ? user.email : '',
        });
      }
    }
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onCancel = () => {
    const { history } = this.props;
    history.push('/');
  };

  onSubmitHandler = (e) => {
    const { updateUserProfile } = this.props;
    updateUserProfile(this.state);
    e.preventDefault();
  };

  render() {
    const { success, history } = this.props;
    const { lastName, firstName, email, phone, username } = this.state;
    if (success) {
      history.push('/');
    }

    return (
      <>
        <UpdateProfileForm
          onChange={this.onChangeHandler}
          lastName={lastName}
          firstName={firstName}
          email={email}
          phone={phone}
          username={username}
          onSubmit={this.onSubmitHandler}
          onCancel={this.onCancel}
        />
      </>
    );
  }
}

UpdateProfile.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  fetchUserByToken: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  user: state.fetchOneUser.singleUser,
  success: state.updateUserProfile.success,
});

const mapDispatchToProps = {
  updateUserProfile,
  fetchUserByToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfile);
