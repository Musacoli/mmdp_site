import { Table } from "semantic-ui-react";
import ActionButtons from "./UserViewComponent";
import React from "react";

const Usersrows = ({ last_name, first_name, username, email, phone }) => (
  <Table.Row>
    <Table.Cell>
      {last_name}
      {first_name}
    </Table.Cell>
    <Table.Cell>{username}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
    <Table.Cell>{phone}</Table.Cell>
  </Table.Row>
);
export default Usersrows;
