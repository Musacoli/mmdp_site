import React from 'react';
import {
  Grid, Input, Button, Container,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';
import GroupList from './GroupList';

import './styles.sass';

const Group = ({
  groups, redirectTo,
  handleCheckBoxChange, bulkDeleteGroups,
  handeMainCheckBoxChange, confirmDeleteGroup,
}) => (
  <Container>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={12}>
          <Input fluid icon="search" placeholder="Search groups" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button fluid className="cool-blue">Search</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <ActionButtons bulkDeleteGroups={bulkDeleteGroups} />
    <GroupList
      groups={groups}
      redirectTo={redirectTo}
      handleCheckBoxChange={handleCheckBoxChange}
      handeMainCheckBoxChange={handeMainCheckBoxChange}
      confirmDeleteGroup={confirmDeleteGroup}
    />
  </Container>

);

Group.propTypes = {
  groups: PropTypes.shape({}).isRequired,
  redirectTo: PropTypes.func.isRequired,
  handeMainCheckBoxChange: PropTypes.func.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  bulkDeleteGroups: PropTypes.func.isRequired,
  confirmDeleteGroup: PropTypes.func.isRequired,
};

export default Group;
