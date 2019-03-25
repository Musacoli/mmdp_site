import React from 'react';
import Templates from '../../Templates';
import StaffStrengthDropdown from '../../../containers/DropDowns/StaffStrength/index';

const StaffStrengthView = ({ ...props }) => (
  <Templates {...props} title="Edit Staff Strength Dropdown">
    <StaffStrengthDropdown {...props} />
  </Templates>
);

export default StaffStrengthView;
