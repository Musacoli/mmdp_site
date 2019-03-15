import React from 'react';
import Proptypes from 'prop-types';
import { Card, Grid, Segment, Image } from 'semantic-ui-react';
import StakeHoldersCard from './StakeHoldersCard';
import EmptyView from '../../common/InvalidPage';

const StakeHoldersCardsList = (props) => {
  const { items, loading } = props;

  if (loading) {
    return (
      <Grid.Row className="center aligned">
        <Segment loading placeholder className="stakeholder-loader">
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </Grid.Row>
    );
  }

  if (items.length > 0) {
    return (
      <Grid.Row>
        <div className="stakeholder-list">
          <Card.Group>
            {items.map((item) => (
              <StakeHoldersCard item={item} key={item._id} />
            ))}
          </Card.Group>
        </div>
      </Grid.Row>
    );
  }

  return (
    <Grid.Row className="ui loading center aligned animated fade">
      <EmptyView
        pathLabel="Add"
        errorDescription="There are no Stakeholders to display"
        path="/stakeholder-directory/add-basic-information"
        errorMessage="Please add a Stakeholder"
      />
    </Grid.Row>
  );
};

StakeHoldersCardsList.propTypes = {
  items: Proptypes.instanceOf(Array),
  loading: Proptypes.bool,
};

StakeHoldersCardsList.defaultProps = {
  loading: false,
  items: [],
};

export default StakeHoldersCardsList;
