import { Table, Checkbox, Button } from 'semantic-ui-react';
import React from 'react';

const TableRowItem = () => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>SL8658RE</Table.Cell>
    <Table.Cell>Approved</Table.Cell>
    <Table.Cell>Lagos</Table.Cell>
    <Table.Cell>
      <Button content="Edit" className="map-btn" />
    </Table.Cell>
  </Table.Row>
);
export default TableRowItem;
