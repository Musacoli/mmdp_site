import { Table } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const Usersrows = ({ lastName, firstName, username, email, phone }) => (
  <Table.Row>
    <Table.Cell>
      {lastName}
      {firstName}
    </Table.Cell>
    <Table.Cell>{username}</Table.Cell>
    <Table.Cell>{email}</Table.Cell>
    <Table.Cell>{phone}</Table.Cell>
  </Table.Row>
);

Usersrows.propTypes = {
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.number,
};

export default Usersrows;
