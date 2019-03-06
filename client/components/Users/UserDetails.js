import React, { Component } from 'react';
import { Table, Grid, Container, Checkbox } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';
import ActionButtons from '../common/ActionButtons';
import NoResults from '../common/TableRowLoading/NoResultsRow';
import Loader from '../common/TableRowLoading';
import { DeleteAllUsers, DeleteUser } from './deleteUser';
import GroupButtons from '../common/GroupButtons';

class DisplayUsers extends Component {
  state = {
    deleteModalOpen: false,
    deleteAllModalOpen: false,
    selectedUser: null,
    selectedUsers: {},
    allSelected: false,
    disabled: true,
  };

  showDeleteModal = (user) =>
    this.setState({
      deleteModalOpen: true,
      selectedUser: user,
    });

  showDeleteAllModal = () =>
    this.setState({
      deleteAllModalOpen: true,
    });

  hideDeleteModal = () =>
    this.setState({ deleteModalOpen: false, deleteAllModalOpen: false });

  handleDelete = () => {
    const { selectedUser } = this.state;
    const { deleteUser, history } = this.props;
    this.setState({ deleteModalOpen: false });
    deleteUser(selectedUser.username, history);
  };

  enableButton = (selectedUsers) => {
    const selected = Object.keys(selectedUsers).filter(
      (key) => selectedUsers[key],
    );
    selected.length === 0
      ? this.setState({ disabled: true })
      : this.setState({ disabled: false });
  };

  selectRow = (users, username) => {
    const { selectedUsers } = this.state;

    selectedUsers[username] = !selectedUsers[username];

    const allSelected = users
      .map((user) => selectedUsers[user.username])
      .reduce((accumulator, currentValue) => accumulator && currentValue);
    this.setState({
      selectedUsers,
      allSelected,
    });
    this.enableButton(selectedUsers);
  };

  handleDeleteAllUsers = () => {
    const { selectedUsers } = this.state;
    const users = Object.keys(selectedUsers).filter(
      (key) => selectedUsers[key],
    );

    const { deleteUser, history } = this.props;
    this.setState({ deleteAllModalOpen: false });
    users.map((user) => deleteUser(user, history));
  };

  selectAllRows = (users) => {
    const { allSelected } = this.state;
    const rows = {};
    users.forEach((user) => {
      rows[user.username] = !allSelected;
    });
    this.setState({
      allSelected: !allSelected,
      selectedUsers: rows,
    });
    this.enableButton(rows);
  };

  render() {
    const { users, success } = this.props;
    const {
      deleteModalOpen,
      deleteAllModalOpen,
      selectedUsers,
      allSelected,
      disabled,
    } = this.state;
    return (
      <div className="main-content-wrapper">
        <DeleteUser
          open={deleteModalOpen}
          closeModal={this.hideDeleteModal}
          handleDelete={this.handleDelete}
        />

        <DeleteAllUsers
          open={deleteAllModalOpen}
          closeModal={this.hideDeleteModal}
          deleteUsers={this.handleDeleteAllUsers}
        />
        <GroupButtons
          deleteUsers={() => this.showDeleteAllModal()}
          disabled={disabled}
        />
        <Container>
          <Grid.Row className="table-row">
            <Table className="no margin top no border radius">
              <Table.Header fullWidth>
                <Table.Row className="tr-height">
                  <Table.HeaderCell>
                    <Checkbox
                      onChange={() => this.selectAllRows(users)}
                      checked={allSelected}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>Fullname</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email address</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>Group(s)</Table.HeaderCell>
                  <Table.HeaderCell>More</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user.username}>
                    <Table.Cell>
                      <Checkbox
                        checked={selectedUsers[user.username]}
                        onChange={() => this.selectRow(users, user.username)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <span className="fullname">{user.first_name}</span>{' '}
                      {user.last_name}
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>
                      {user.groups.length > 0 &&
                        user.groups.map((agroup) => (
                          <Table.Row className="user-group-name">
                            {agroup.name}
                          </Table.Row>
                        ))}
                    </Table.Cell>
                    <Table.Cell>
                      <ActionButtons
                        email={user.email}
                        username={user.username}
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
  users: PropTypes.arrayOf(PropTypes.shape({})),
  success: PropTypes.bool,
  history: PropTypes.shape({}),
  deleteUser: PropTypes.func,
};

export default DisplayUsers;
