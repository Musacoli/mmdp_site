import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const DropdownButton = ({ email, handleDelete }) => (
  <Dropdown pointing icon="ellipsis horizontal user-actions">
    <Dropdown.Menu className="user-action-dropdown">
      <Dropdown.Item href={email ? `edit/${email}` : ''}>Edit</Dropdown.Item>
      <Dropdown.Item className="delete-user" onClick={handleDelete}>
        Delete account
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

DropdownButton.propTypes = {
  email: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default DropdownButton;
