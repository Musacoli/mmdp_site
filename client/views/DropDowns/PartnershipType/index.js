import React from 'react';
import Templates from '../../Templates';
import PartnershipType from '../../../containers/DropDowns/PartnershipType';

const PartnershipTypeView = ({ ...props }) => (
  <Templates {...props} title="Edit Partnership Type Dropdown">
    <PartnershipType {...props} />
  </Templates>
);

export default PartnershipTypeView;
