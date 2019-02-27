import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const StakeholderModalItem = ({ entry }) => (
  <Grid.Column className="column pr-94">
    <span className="column-title">{Object.keys(entry)[0]}</span>
    <br />
    <span className="column-text">{entry[Object.keys(entry)[0]]}</span>
  </Grid.Column>
);
StakeholderModalItem.propTypes = {
  entry: PropTypes.instanceOf(Object),
};

export default StakeholderModalItem;
