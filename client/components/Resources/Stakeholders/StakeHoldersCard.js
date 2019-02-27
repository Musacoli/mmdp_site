// Display a single stakeholder in a compact elementt
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import StakeholderModal from '../../../containers/Resources/StakeHolders/StakeholdersModal/StakeholderModal';

const StakeHoldersCard = (props) => {
  const { item } = props;
  return (
    <Card key={item._id} raised className="media stakeholder-card">
      <div className=" stakeholder-card-title">
        <StakeholderModal
          trigger={
            <Truncate lines={1}>
              <h4>{item.basicInformation.stakeholderName}</h4>
            </Truncate>
          }
          item={item}
          key={`modal_${item._id}`}
        />
      </div>
      <div className="stakeholder-card-body">
        {item.basicInformation.headOfficeAddress} <br />
        {item.basicInformation.email} <br />
        {item.basicInformation.phoneNumberOne} <br />
        {item.basicInformation.phoneNumberThree} <br />
      </div>
      <div className=" stakeholder-footer">
        <Link to="/">
          <button type="button" className="footer-btn txt-blue">
            Edit
          </button>
        </Link>
        <Link to="/">
          <button type="button" className="footer-btn txt-red">
            Delete
          </button>
        </Link>
      </div>
    </Card>
  );
};

StakeHoldersCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default StakeHoldersCard;
