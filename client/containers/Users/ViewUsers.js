import React, { Component } from "react";
import PropTypes from "prop-types";
import UserView from "../../components/Users";
import Group from "../../components/Users/GroupButtons";
import UserViewList from "../../components/Users/UserViewComponent";

class ViewUsers extends Component {
  state = { name: "Users" };
  handleSubmit = () => {
    alert("helllo world");
  };
  render() {
    const { name } = this.state;
    return (
      <div>
        {/*<UserView handleSubmit={this.handleSubmit} name={name} />*/}
        <Group />
        <UserViewList />
      </div>
    );
  }
}

ViewUsers.propTypes = {};

export default ViewUsers;
