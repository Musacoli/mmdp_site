import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Checkbox, Dropdown,
} from 'semantic-ui-react';
import ActionModal from './ActionModal';

const GroupItem = ({
  group, redirectTo, handleCheckBoxChange, confirmDeleteGroup,
}) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Checkbox className="groupItem-main-checkbox" checked={group.selected} onChange={() => handleCheckBoxChange(group)} />
    </Table.Cell>
    <Table.Cell>{group.name}</Table.Cell>
    <Table.Cell>{group.users.length}</Table.Cell>
    <Table.Cell>
      {group.permissions.map(permission => (
        <div key={permission[Object.keys(permission)] + group.name} className="permission-padded">{permission[Object.keys(permission)]}</div>
      ))}
    </Table.Cell>
    <Table.Cell>

      <Dropdown pointing icon="ellipsis horizontal" className="linkitem">
        <Dropdown.Menu>
          <Dropdown.Item className="group-item-edit-dropdown" onClick={() => redirectTo(group._id)}>Edit</Dropdown.Item>
          <Dropdown.Item>
            <ActionModal
              triggerText="Delete Group"
              header={`Delete ${group.name} Group`}
              content="Are you sure you want to this group?"
              confirmDeleteGroup={confirmDeleteGroup}
              group={group}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


    </Table.Cell>
  </Table.Row>
);

GroupItem.propTypes = {
  group: PropTypes.shape({}).isRequired,
  redirectTo: PropTypes.func.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  confirmDeleteGroup: PropTypes.func.isRequired,
};

export default GroupItem;
