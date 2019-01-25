import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownButton = ({email}) => (
  <Dropdown  className='btn-action' pointing icon="ellipsis horizontal">
    <Dropdown.Menu>
      <Dropdown.Item href={email ? 'edit/'+email : ''}>Edit</Dropdown.Item>
      <Dropdown.Item>Delete account</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownButton;
