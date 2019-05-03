// Display a single stakeholder in a compact elementt
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import _ from 'lodash';
import StakeholderModal from '../../../containers/Resources/StakeHolders/StakeholdersModal/StakeholderModal';
import ActionModal from '../../common/Modal/ActionModal';

const getLocation = (item) => {
  const address = _.find(item.adresses || [], { addressType: 'HOME' });
  return address === undefined ? '' : address.address || '';
};
const Button = ({ classes, text }) => (
  <button type="button" className={classes}>
    {text}
  </button>
);

const StakeHoldersCard = (props) => {
  const { item, deleteStakeholder } = props;
  return (
    <Card key={item._id} raised className="media stakeholder-card">
      <div className=" stakeholder-card-title">
        <StakeholderModal
          trigger={
            <Truncate lines={1}>
              <h4>{item.organisationName}</h4>
            </Truncate>
          }
          item={item}
          key={`modal_${item._id}`}
        />
      </div>
      <div className="stakeholder-card-body">
        {getLocation(item)} <br />
        {item.email || '-'} <br />
        {item.localManagerMobile || '-'} <br />
        {item.phoneNumber || '-'} <br />
      </div>
      <div className=" stakeholder-footer">
        <Link
          to={`stakeholder-directory/edit-basic-information/${
            item.organisationName
          }`}
        >
          <Button text="Edit" classes="footer-btn txt-blue" />
        </Link>
        <ActionModal
          group={item._id}
          confirmDeleteGroup={deleteStakeholder}
          header="Delete a Stakeholder"
          content={`Do you want to remove ${item.organisationName}?`}
          triggerText={<Button classes="footer-btn txt-red" text="Delete" />}
        />
      </div>
    </Card>
  );
};

StakeHoldersCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  deleteStakeholder: PropTypes.func.isRequired,
};

export default StakeHoldersCard;
