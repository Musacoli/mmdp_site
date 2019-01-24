import React from 'react'
import {Grid, Container, Input, Dropdown, Button} from 'semantic-ui-react'

const SearchSection = ({handleSubmit, name}) => (
   <Container>
  <Grid columns='equal'>
    <Grid.Column >
      <Input fluid icon='search' placeholder='Search...' />
    </Grid.Column>
    <Grid.Column width={5}>
      <Dropdown placeholder='All Groups' fluid multiple search selection />
    </Grid.Column>
    <Grid.Column width={3}>
      <Button className='search-btn' onClick={handleSubmit}>search {name}</Button>
    </Grid.Column>
  </Grid>
   </Container>
);

export default SearchSection;
