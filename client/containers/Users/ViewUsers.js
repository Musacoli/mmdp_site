import React, { Component } from "react";
import Group from "../../components/Users/GroupButtons";
import UserViewList from "../../components/Users/UserViewComponent";
import { fetchingStarted } from "../../store/actions/users";
import { connect } from "react-redux";


class ViewUsers extends Component {

  componentWillMount = () => {
    const { fetchUsersList } = this.props;
    fetchUsersList();
  };

  render() {
    const { users, success } = this.props;
    return (
      <div>
        <Group />
        <UserViewList users={users} success={success} />
      </div>
    );
  }
}

ViewUsers.propTypes = {};

const mapStateToProps = ({ Users }) => Users;

const mapDispatchToProps = {
  fetchUsersList: fetchingStarted
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUsers);
