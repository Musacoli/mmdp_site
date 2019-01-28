import React from "react";
import {Link} from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const DropdownButton = ({email}) => (
  <Dropdown pointing icon="ellipsis horizontal">
    <Dropdown.Menu>
     <Dropdown.Item href={email ? 'edit/'+email : ''}>Edit</Dropdown.Item>
      {/*<Dropdown.Item>Reset password</Dropdown.Item>*/}
      {/*<Dropdown.Item>Unlock account</Dropdown.Item>*/}
      <Dropdown.Item href={email ? 'delete/'+email : ''}>Delete account</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownButton;
