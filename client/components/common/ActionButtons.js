import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const DropdownButton = ({ email, username, handleDelete }) => (
  <Dropdown pointing icon="ellipsis horizontal">
    <Dropdown.Menu className="user-action-dropdown">
      <Dropdown.Item href={email ? `edit/${email}/${username}` : ''}>
        Edit
      </Dropdown.Item>
      <Dropdown.Item onClick={handleDelete} className="delete-user">
        Delete account
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

DropdownButton.propTypes = {
  email: PropTypes.string,
  handleDelete: PropTypes.func,
  username: PropTypes.string,
};

export default DropdownButton;
