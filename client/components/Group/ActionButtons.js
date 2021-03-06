import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import ActionModal from '../common/Modal/ActionModal';

const ActionButtons = ({ bulkDeleteGroups }) => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column className="new-group" width={4}>
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
          <Button id="" disabled>
            <Icon name="pencil alternate" />
            Edit
          </Button>
          <Button color="red">
            <ActionModal
              triggerText="Delete"
              header="Delete Selected Group"
              content="Are you sure you want to delete selected group(s)?"
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
