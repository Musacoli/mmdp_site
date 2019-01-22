import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownButton = () => (
  <Dropdown pointing icon="ellipsis horizontal">
    <Dropdown.Menu>
      <Dropdown.Item>Edit</Dropdown.Item>
      {/*<Dropdown.Item>Reset password</Dropdown.Item>*/}
      {/*<Dropdown.Item>Unlock account</Dropdown.Item>*/}
      <Dropdown.Item>Delete account</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownButton;
