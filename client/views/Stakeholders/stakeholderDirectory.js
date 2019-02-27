import React from 'react';
import Template from '../Templates';
import StakeholdersList from '../../containers/Resources/StakeHolders/StakeholdersList';

const StakeholdersView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <StakeholdersList {...props} />
  </Template>
);

export default StakeholdersView;
