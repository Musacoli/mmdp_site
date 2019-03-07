/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserList from '../../components/Users/UserDetails';
import Search from '../../components/common/Form/UsersSearch';
import { fetchingGroups } from '../../store/actions/groups';
import groupOptions from '../../utils/mapGroups';
import { fetchingStarted, userDeletingStarted } from '../../store/sagas/users';
import Pagination from '../../components/common/Pagination';

export class ViewUsers extends Component {
  state = {
    search: '',
    selectedOption: '',
  };

  componentWillMount() {
    const { allGroups } = this.props;
    allGroups();
  }

  componentDidMount = () => {
    this.fetchUsersList();
  };

  fetchUsersList = (pageNum = 1) => {
    const { fetchUsersList } = this.props;
    const { selectedOption } = this.state;
    const { search } = this.state;

    fetchUsersList({ page: pageNum, search, selectedOption });
  };

  handleSearch = (ev) => {
    ev.preventDefault();
    this.fetchUsersList(1);
  };

  handleChange = (selectedOption) => {
    this.setState(() => ({
      selectedOption: selectedOption ? selectedOption.value : '',
    }));
    this.fetchUsersList();
  };

  handleSearchChange = (ev) => {
    const { fetchUsersList } = this.props;
    const { selectedOption } = this.state;
    const search = ev.target.value;

    this.setState({ search });

    if (search !== '' || selectedOption !== '') {
      fetchUsersList(1, { search, selectedOption });
    }
  };

  render() {
    const { users, success, deleteUser, history, pagination } = this.props;
    const {
      groups: { groups },
    } = this.props;
    const options = [];
    if (groups.length > 0) {
      groupOptions(groups, options);
    }
    const { selectedOption } = this.state;
    return (
      <div>
        <Search
          options={options}
          handleSearch={this.handleSearch}
          handleChange={this.handleChange}
          handleSearchChange={this.handleSearchChange}
          value={selectedOption}
        />
        <UserList
          users={users}
          success={success}
          deleteUser={deleteUser}
          history={history}
        />
        <Pagination
          handlePageChange={this.fetchUsersList}
          data={pagination}
          className="right floated users-pagination"
        />
      </div>
    );
  }
}

ViewUsers.defaultProps = {
  pagination: {},
};

ViewUsers.propTypes = {
  fetchUsersList: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  success: PropTypes.bool,
  deleteUser: PropTypes.func,
  history: PropTypes.shape(),
  allGroups: PropTypes.func,
  groups: PropTypes.shape(),
  pagination: PropTypes.shape({}),
};

export const mapStateToProps = ({ Users, deleteUser, groups }) => ({
  ...Users,
  deleteUser,
  groups,
});

const mapDispatchToProps = {
  fetchUsersList: fetchingStarted,
  deleteUser: userDeletingStarted,
  allGroups: fetchingGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewUsers);
