// Display a single stakeholder in a compact elementt
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const StakeHoldersCard = (props) => {
  const { item } = props;
  return (
    <Card key={item._id} raised className="media">
      <Card.Content className="show">
        <h4 className="">{item.basicInformation.stakeholderName}</h4>
      </Card.Content>
      <Card.Content className="show">
        <div className="card-text">
          <p>{item.basicInformation.state}</p>
          <p>{item.basicInformation.email}</p>
          <p>{item.basicInformation.phoneNumberOne}</p>
          <p>{item.basicInformation.phoneNumberThree}</p>
        </div>
      </Card.Content>
      <Card.Content className="show">
        <div className="ui two buttons" />
      </Card.Content>
    </Card>
  );
};

StakeHoldersCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default StakeHoldersCard;
