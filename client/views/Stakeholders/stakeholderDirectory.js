import React from 'react';
import Template from '../Templates';
import StakeholderDirectory from '../../containers/Stakeholders/stakeholdersList';

const StakeholdersView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <StakeholderDirectory {...props} />
  </Template>
);

export default StakeholdersView;
