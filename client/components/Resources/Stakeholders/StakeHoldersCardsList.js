import React from 'react';
import Proptypes from 'prop-types';
import { Card, Grid } from 'semantic-ui-react';
import StakeHoldersCard from './StakeHoldersCard';
import EmptyView from '../../common/InvalidPage';
import PlaceholderCards from './placeholderCards';

const StakeHoldersCardsList = (props) => {
  const { items, loading, removeStakeholder } = props;

  if (loading)
    return (
      <Grid.Row>
        <div className="stakeholder-list">
          <PlaceholderCards />
        </div>
      </Grid.Row>
    );

  if (items.length > 0) {
    return (
      <Grid.Row>
        <div className="stakeholder-list">
          <Card.Group>
            {items.map((item) => (
              <StakeHoldersCard
                item={item}
                key={item._id}
                deleteStakeholder={removeStakeholder}
              />
            ))}
          </Card.Group>
        </div>
      </Grid.Row>
    );
  }

  return (
    <Grid.Row>
      <Grid.Column>
        <EmptyView
          pathLabel="Add"
          errorDescription="There are no Stakeholders to display"
          path="/stakeholder-directory/add-basic-information"
          errorMessage="Please add a Stakeholder"
        />
      </Grid.Column>
    </Grid.Row>
  );
};

StakeHoldersCardsList.propTypes = {
  items: Proptypes.instanceOf(Array),
  loading: Proptypes.bool,
  removeStakeholder: Proptypes.func.isRequired,
};

StakeHoldersCardsList.defaultProps = {
  loading: false,
  items: [],
};

export default StakeHoldersCardsList;
