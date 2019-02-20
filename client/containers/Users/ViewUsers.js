import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Group from '../../components/common/GroupButtons';
import UserViewList from '../../components/Users/USersDetails';
import Search from '../../components/common/Form/UsersSearch';
import { fetchingGroups } from '../../store/actions/groups';
import groupOptions from '../../utils/mapGroups';
import { fetchingStarted, userDeletingStarted } from '../../store/sagas/users';
import Pagination from '../../components/common/Pagination';

export class ViewUsers extends Component {
  state = {
    page: 1,
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

  fetchUsersList = () => {
    const { fetchUsersList } = this.props;
    const { selectedOption } = this.state;
    const { page } = this.state;
    const { search } = this.state;

    fetchUsersList({ page, search, selectedOption });
  };

  handleSearch = (ev) => {
    ev.preventDefault();
    this.fetchUsersList();
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
    const { page } = this.state;
    const search = ev.target.value;

    this.setState({ search });

    if (search === '' || selectedOption === '') {
      fetchUsersList({ page, search, selectedOption });
    }
  };

  render() {
    const { users, success, deleteUser, history, pagination } = this.props;
    let { groups } = this.props;
    const options = [];
    groups = groups.groups;
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
        <Group />
        <UserViewList
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
  users: PropTypes.shape(),
  success: PropTypes.bool,
  deleteUser: PropTypes.func,
  history: PropTypes.shape(),
  allGroups: PropTypes.shape({}),
  groups: PropTypes.shape(),
  pagination: PropTypes.shape(),
};

export const mapStateToProps = ({ Users, deleteUser, groups, pagination }) => ({
  ...Users,
  deleteUser,
  groups,
  pagination,
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
