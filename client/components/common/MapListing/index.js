import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import TableRowItem from './TableRowItem';
import TableHeader from './TableHeader';

const maps = [1, 2, 3];

const MapListing = () => (
  <React.Fragment>
    <Label content="States maps found (0)" className="states-label" />
    <Table basic className="table-list">
      <TableHeader />
      <Table.Body>
        {maps.map(() => {
          return <TableRowItem />;
        })}
      </Table.Body>
    </Table>
  </React.Fragment>
);

export default MapListing;
