import React from 'react';
import Templates from '../Templates';
import ManageStaffStrength from '../../containers/Stakeholders/ManageStaffStrength';

const EditDropDown = ({ ...props }) => (
  <Templates {...props} title="Edit Dropdown">
    <ManageStaffStrength {...props} />
  </Templates>
);

export default EditDropDown;
