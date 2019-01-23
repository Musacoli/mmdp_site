import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, Table,
} from 'semantic-ui-react';
import GroupItem from './GroupItem';
import TableRowLoading from '../common/TableRowLoading';
import NoResultsRow from '../common/TableRowLoading/NoResultsRow';

const GroupList = ({
  groups, redirectTo,
  handleCheckBoxChange,
  handeMainCheckBoxChange,
  confirmDeleteGroup,
}) => (
  <Table compact className="no margin top no border radius">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox className="group-list-check-box" onChange={handeMainCheckBoxChange} />
        </Table.HeaderCell>
        <Table.HeaderCell>Group Name</Table.HeaderCell>
        <Table.HeaderCell>Users</Table.HeaderCell>
        <Table.HeaderCell>Permissions</Table.HeaderCell>
        <Table.HeaderCell>More</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {groups.groups.map(group => (
        <GroupItem
          group={group}
          redirectTo={redirectTo}
          key={group.name}
          handleCheckBoxChange={handleCheckBoxChange}
          confirmDeleteGroup={confirmDeleteGroup}
        />
      ))}
    </Table.Body>
    {groups.isFetching
    && <TableRowLoading colSpan={5} />
    }
    {!groups.isFetching && groups.groups.length < 1
    && <NoResultsRow colSpan={5} />
    }

  </Table>
);
GroupList.propTypes = {
  groups: PropTypes.shape({}).isRequired,
  redirectTo: PropTypes.func.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  handeMainCheckBoxChange: PropTypes.func.isRequired,
  confirmDeleteGroup: PropTypes.func.isRequired,
};
export default GroupList;
