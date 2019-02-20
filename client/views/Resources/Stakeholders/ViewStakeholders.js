import React from 'react';
import Templates from '../../Templates';
import StakeholdersList from '../../../containers/Resources/StakeHolders/StakeholdersList';

const ViewStakeholders = ({ ...props }) => (
  <Templates {...props} title="Stakeholder Directory">
    <StakeholdersList />
  </Templates>
);

export default ViewStakeholders;
