import React, { Component } from "react";
import PropTypes from "prop-types";
import UserView from "../../components/Users";
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
    const { users } = this.props;
    return (
      <div>
        {/*<UserView handleSubmit={this.handleSubmit} name={name} />*/}
        <Group />
        <UserViewList users={users} />
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
