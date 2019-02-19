import React from 'react';
import { Grid, Checkbox } from 'semantic-ui-react';

const MediaType = () => {
  return (
    <Grid columns={4}>
      <Grid.Row className="media_type">
        <Grid.Column width="2" className="title">
          <div className="title bold">Media Type:</div>
        </Grid.Column>
        <Grid.Column width="1" className="mr-12">
          <Checkbox label="Photos" />
        </Grid.Column>
        <Grid.Column width="1" className="mr-12">
          <Checkbox label="Videos" />
        </Grid.Column>
        <Grid.Column width="13" />
      </Grid.Row>
    </Grid>
  );
};

export default MediaType;
