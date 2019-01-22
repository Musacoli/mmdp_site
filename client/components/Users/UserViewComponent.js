import React from "react";
import { Table, Checkbox, Grid, Container } from "semantic-ui-react";
import ActionButtons from "./ActionButtons";

const DisplayUsers = ({first_name, last_name, username, email, phone}) => (
  <Container>
    <Grid.Row className="table-row">
      <Table className="no margin top no border radius">
        <Table.Header fullWidth>
          <Table.Row>
            {/*<Table.HeaderCell>*/}
              {/*<Checkbox />*/}
            {/*</Table.HeaderCell>*/}
            <Table.HeaderCell>Fullname</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email address</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            {/*<Table.HeaderCell>Groups</Table.HeaderCell>*/}
            <Table.HeaderCell>More</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            {/*<Table.Cell collapsing>*/}
              {/*<Checkbox />*/}
            {/*</Table.Cell>*/}
            <Table.Cell>{first_name}  {" "} {last_name}</Table.Cell>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{phone}</Table.Cell>
            {/*<Table.Cell>SuperUser</Table.Cell>*/}
            <Table.Cell><ActionButtons/></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
  </Container>
);

export default DisplayUsers;
