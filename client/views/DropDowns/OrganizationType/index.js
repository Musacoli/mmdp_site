import React from 'react';
import Templates from '../../Templates';
import OrganizationType from '../../../containers/DropDowns/OrganizationType';

const OrganizationTypeView = ({ ...props }) => (
  <Templates {...props} title="Organization Type Dropdown">
    <OrganizationType {...props} />
  </Templates>
);

export default OrganizationTypeView;
