import React from 'react';
import Template from '../Templates';
import StakeholderDirectory from '../../containers/Stakeholders/stakeholdersList';
// import StakeholderDirectory from '../../containers/Resources/StakeHolders/StakeholdersList';

const StakeholdersView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <StakeholderDirectory {...props} />
  </Template>
);

export default StakeholdersView;
