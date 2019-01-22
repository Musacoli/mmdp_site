import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownButton = ({email, handleDelete}) => (
  <Dropdown pointing icon="ellipsis horizontal">
    <Dropdown.Menu>
     <Dropdown.Item href={email ? 'edit/'+email : ''}>Edit</Dropdown.Item>
      <Dropdown.Item onClick={handleDelete}>Delete account</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownButton;
