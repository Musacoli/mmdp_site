import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import ActionModal from './ActionModal';

const ActionButtons = ({ bulkDeleteGroups }) => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column width={4}>
        <a
          className="no border raduis radiusless ui button cool-blue "
          href="/group"
        >
          New Group
        </a>
      </Grid.Column>
      <Grid.Column width={8} />
      <Grid.Column width={4}>
        <Button.Group basic className="right floated no border radius">
          <Button disabled>
            <Icon name="pencil alternate" />
            Edit
          </Button>
          <Button color="red">
            <ActionModal
              triggerText="Delete"
              header="Delete Selected Group"
              content="Are you sure you want to selected group?"
              confirmDeleteGroup={bulkDeleteGroups}
            />
          </Button>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

ActionButtons.propTypes = {
  bulkDeleteGroups: PropTypes.func.isRequired,
};

export default ActionButtons;
