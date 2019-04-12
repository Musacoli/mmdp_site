import React from 'react';
import { Table, Label, Grid } from 'semantic-ui-react';
import TableRowItem from './TableRowItem';
import TableHeader from './TableHeader';

const MapListing = (props) => {
  const { Maps, loading, onUpdate, headers, label, btnName, onMapView } = props;
  const itemsCount = Maps ? Maps.length : 0;
  const content = `${label} (${itemsCount})`;
  return (
    Maps && (
      <Grid.Row loading={loading}>
        <Label content={content} className="states-label" />
        <Table basic className="map-list">
          <TableHeader headers={headers} />
          <Table.Body>
            {Maps.map((item, index) => {
              return (
                <TableRowItem
                  key={item.id || index}
                  mapData={item}
                  onUpdate={onUpdate}
                  btnName={btnName}
                  onMapView={onMapView}
                />
              );
            })}
          </Table.Body>
        </Table>
      </Grid.Row>
    )
  );
};

export default MapListing;
