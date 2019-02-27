import React from 'react';
import Template from '../Templates';
import AddStakeholder from '../../containers/Resources/StakeHolders/addStakeholder/addStakeholder';

const AddStakeholderView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <AddStakeholder {...props} />
  </Template>
);

export default AddStakeholderView;
