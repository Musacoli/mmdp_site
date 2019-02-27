import React from 'react';
import propTypes from 'prop-types';
import { Card, Placeholder } from 'semantic-ui-react';

const PlaceholderCards = (props) => {
  const { noOfCards } = props;
  const arr = Array(noOfCards).fill(0);
  return (
    <Card.Group itemsPerRow={3}>
      {arr.map(() => (
        <Card key={Math.random()} raised>
          <Placeholder style={{ height: 150, width: 150 }} />
        </Card>
      ))}
    </Card.Group>
  );
};

PlaceholderCards.propTypes = {
  noOfCards: propTypes.number,
};

PlaceholderCards.defaultProps = {
  noOfCards: 6,
};

export default PlaceholderCards;
