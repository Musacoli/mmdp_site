import React, { Component } from "react";
import { Table, Checkbox, Grid, Container } from "semantic-ui-react";
import UserRows from "./TableRows";
import ActionButtons from "./ActionButtons";
import NoResults from "../common/TableRowLoading/NoResultsRow";
import Loader from "../common/TableRowLoading";
import DeleteUser from "./deleteUser";
import * as PropTypes from "prop-types";

class DisplayUsers extends Component {
  state = {
    deleteModalOpen: false,
    selectedUser: null
  };

  showDeleteModal = user =>
    this.setState({
      deleteModalOpen: true,
      selectedUser: user
    });

  hideDeleteModal = () => this.setState({ deleteModalOpen: false });

  handleDelete = () => {
    const { selectedUser } = this.state;
    const { deleteUser , history} = this.props;
    this.setState({ deleteModalOpen: false});
    deleteUser(selectedUser.username, history);
  };

  render() {
    let { users, success} = this.props;
    const { deleteModalOpen } = this.state;
    return (
      <div className="main-content-wrapper">
        <DeleteUser
          open={deleteModalOpen}
          closeModal={this.hideDeleteModal}
          handleDelete={this.handleDelete}
        />
        <Container>
          <Grid.Row className="table-row">
            <Table className="no margin top no border radius">
              <Table.Header fullWidth>
                <Table.Row className="tr-height">
                  <Table.HeaderCell>Fullname</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email address</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>More</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map(user => (
                  <Table.Row key={user.username}>
                    <Table.Cell>
                      <span className="fullname">{user.first_name}</span>{" "}
                      {user.last_name}
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>
                      <ActionButtons
                        email={user.email}
                        handleDelete={() => this.showDeleteModal(user)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              {success ? users.length === 0 && <NoResults /> : <Loader />}
            </Table>
          </Grid.Row>
        </Container>
      </div>
    );
  }
}

DisplayUsers.propTypes = {
  users: PropTypes.any,
  success: PropTypes.any
};

export default DisplayUsers;
