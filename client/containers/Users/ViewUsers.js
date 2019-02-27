import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Group from '../../components/common/GroupButtons';
import UserViewList from '../../components/Users/UserDetails';
import { fetchingStarted, userDeletingStarted } from '../../store/sagas/users';

export class ViewUsers extends Component {
  componentDidMount = () => {
    const { fetchUsersList } = this.props;
    fetchUsersList();
  };

  render() {
    const { users, success, deleteUser, history } = this.props;
    return (
      <div>
        <Group />
        <UserViewList
          users={users}
          success={success}
          deleteUser={deleteUser}
          history={history}
        />
      </div>
    );
  }
}

ViewUsers.propTypes = {
  fetchUsersList: PropTypes.func,
  users: PropTypes.shape(),
  success: PropTypes.bool,
  deleteUser: PropTypes.func,
  history: PropTypes.shape(),
};

export const mapStateToProps = ({ Users, deleteUser }) => ({
  ...Users,
  deleteUser,
});

const mapDispatchToProps = {
  fetchUsersList: fetchingStarted,
  deleteUser: userDeletingStarted,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewUsers);
