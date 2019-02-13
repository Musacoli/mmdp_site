import React from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';

const SearchMedia = () => {
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column width={10}>
          <Input fluid icon={null} className="input" placeholder="Search..." />
        </Grid.Column>
        <Grid.Column width={3}>
          <Button fluid className="common__button bg-cool-blue">
            Search
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>
          <a href="/resources/document/add">
            <Button className="common__button bg-ugly-blue" fluid>
              Add Media
            </Button>
          </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SearchMedia;
