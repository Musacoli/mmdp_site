import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';
import GroupList from './GroupList';
import Search from '../common/Search';
import Pagination from '../common/Pagination';

const Group = ({
  groups,
  redirectTo,
  handleCheckBoxChange,
  bulkDeleteGroups,
  handeMainCheckBoxChange,
  confirmDeleteGroup,
  handleSearchChange,
  handleSearch,
  handleChangePage,
}) => (
  <div>
    <Search onChange={handleSearchChange} onSearch={handleSearch} />
    <ActionButtons bulkDeleteGroups={bulkDeleteGroups} />
    <GroupList
      groups={groups}
      redirectTo={redirectTo}
      handleCheckBoxChange={handleCheckBoxChange}
      handeMainCheckBoxChange={handeMainCheckBoxChange}
      confirmDeleteGroup={confirmDeleteGroup}
    />
    <Pagination
      handlePageChange={handleChangePage}
      data={groups.pagination}
      className="right floated groups-pagination"
    />
  </div>
);

Group.propTypes = {
  groups: PropTypes.shape({}).isRequired,
  redirectTo: PropTypes.func.isRequired,
  handeMainCheckBoxChange: PropTypes.func.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  bulkDeleteGroups: PropTypes.func.isRequired,
  confirmDeleteGroup: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Group;
