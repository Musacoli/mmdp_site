import React from "react";
import { Table, Checkbox, Grid, Container } from "semantic-ui-react";
import UserRows from './TableRows';
import ActionButtons from './ActionButtons'

const DisplayUsers = ({users}) => (
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
          {users.map(user => (
            <Table.Row>
              <Table.Cell>{user.first_name}{" "}{user.last_name}</Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phone}</Table.Cell>
              {/*<Table.Cell>SuperUser</Table.Cell>*/}
              <Table.Cell>
                <ActionButtons email={user.email}/>
              </Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
    </Grid.Row>
  </Container>
);

export default DisplayUsers;
