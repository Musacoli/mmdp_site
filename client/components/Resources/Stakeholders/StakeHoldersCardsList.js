import React from 'react';
import Proptypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import StakeHoldersCard from './StakeHoldersCard';

const StakeHoldersCardsList = (props) => {
  const { items } = props;
  return (
    <Card.Group>
      {items.map((item) => {
        return <StakeHoldersCard item={item[0]} key={item[0]._id} />;
      })}
    </Card.Group>
  );
};

StakeHoldersCardsList.propTypes = {
  items: Proptypes.instanceOf(Array),
};

export default StakeHoldersCardsList;
