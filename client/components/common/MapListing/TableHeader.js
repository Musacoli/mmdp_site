import { Checkbox, Table } from 'semantic-ui-react';
import React from 'react';

const TableHeader = ({ headers }) => (
  <Table.Header>
    <Table.Row className="title-cell">
      <Table.HeaderCell>
        <Checkbox />
      </Table.HeaderCell>
      {headers &&
        headers.map((header) => {
          return <Table.HeaderCell key={header}>{header}</Table.HeaderCell>;
        })}
    </Table.Row>
  </Table.Header>
);
export default TableHeader;
