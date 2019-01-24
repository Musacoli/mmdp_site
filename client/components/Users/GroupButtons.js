import React from 'react';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';

const GroupButtons = () => (
  <Container>
    <Grid columns={3}>
      <Grid.Row className='group-btn'>
        <Grid.Column width={2}>
          <a className="no border raduis radiusless ui button ugly-blue " href="/users">save user</a>
        </Grid.Column>
        {/*<Grid.Column width={5} />*/}
        <Grid.Column width={14}>
          <Button.Group basic className="right floated no border radius button-height group-btn btn-actions">
            <Button className='btn-smaller btn-actions'>
              <Icon name="pencil alternate" />
              Edit
            </Button>
            {/*<Button className='pass-reset btn-actions-account'>*/}
              {/*<Icon/>*/}
              {/*Reset password*/}
            {/*</Button>*/}
            {/*<Button className='pass-reset btn-actions-account'>*/}
              {/*<Icon name="unlock" />*/}
              {/*Unlock Account*/}
            {/*</Button>*/}
            <Button color="red" className='btn-smaller btn-actions'>
              <Icon name="trash alternate outline" />
              Delete
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default GroupButtons;
