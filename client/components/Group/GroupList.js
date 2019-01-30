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

    <Table.Body className="table__list">
      <Table.Row>
        <Table.Cell>
          <Checkbox className="group-list-check-box" onChange={handeMainCheckBoxChange} />
        </Table.Cell>
        <Table.Cell><b>Group name</b></Table.Cell>
        <Table.Cell><b>Users</b></Table.Cell>
        <Table.Cell><b>Permissions</b></Table.Cell>
        <Table.Cell><b>More</b></Table.Cell>
      </Table.Row>
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
