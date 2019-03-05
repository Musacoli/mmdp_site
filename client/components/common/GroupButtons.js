import React from 'react';
import { Grid, Button, Icon, Container } from 'semantic-ui-react';
import * as PropTypes from 'prop-types';

const GroupButtons = ({ deleteUsers, disabled }) => (
  <Container>
    <Grid columns={3}>
      <Grid.Row className="group-btn">
        <Grid.Column width={3}>
          <a
            className="no border raduis radiusless ui button ugly-blue "
            href="/users"
          >
            save user
          </a>
        </Grid.Column>
        <Grid.Column width={13} className="actions-delete-edit">
          <Button.Group
            basic
            className="right floated no border radius button-height group-btn btn-actions"
          >
            <Button className="btn-smaller btn-actions">
              <Icon name="pencil alternate" />
              Edit
            </Button>
            <Button
              color="red"
              className="btn-smaller btn-actions"
              onClick={deleteUsers}
              disabled={disabled}
            >
              <Icon name="trash alternate outline" />
              Delete
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

GroupButtons.propTypes = {
  deleteUsers: PropTypes.func,
  disabled: PropTypes.bool,
};
export default GroupButtons;
