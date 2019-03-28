import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input, Button } from 'semantic-ui-react';
import AddNewButton from '../../common/AddNewButton';

const TopBar = ({ instanceName, addMediaUrl }) => {
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
          <AddNewButton
            url={addMediaUrl}
            className="common__button bg-ugly-blue"
            text={instanceName}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
TopBar.propTypes = {
  instanceName: PropTypes.string,
  addMediaUrl: PropTypes.string,
};

TopBar.defaultProps = {
  instanceName: 'Document',
  addMediaUrl: '/resources/document/add',
};
export default TopBar;
