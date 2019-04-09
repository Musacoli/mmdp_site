import { Checkbox, Table } from 'semantic-ui-react';
import React from 'react';

const TableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>
        <Checkbox />
      </Table.HeaderCell>
      <Table.HeaderCell>Unique ID</Table.HeaderCell>
      <Table.HeaderCell>Shape preview</Table.HeaderCell>
      <Table.HeaderCell>State ID</Table.HeaderCell>
      <Table.HeaderCell>More</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);
export default TableHeader;
