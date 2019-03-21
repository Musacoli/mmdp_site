import React from 'react';
import Templates from '../../Templates';
import RegistrationStatusDropdown from '../../../containers/DropDowns/RegistrationStatus/index';

const RegistrationStatusView = ({ ...props }) => (
  <Templates {...props} title="Edit Registration Status Dropdown">
    <RegistrationStatusDropdown {...props} />
  </Templates>
);

export default RegistrationStatusView;
