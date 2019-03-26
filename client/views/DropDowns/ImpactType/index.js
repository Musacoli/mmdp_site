import React from 'react';
import Templates from '../../Templates';
import ImpactTypes from '../../../containers/DropDowns/ImpactTypes';

const ImpactTypeView = ({ ...props }) => (
  <Templates {...props} title="Edit Impact Type Dropdown">
    <ImpactTypes {...props} />
  </Templates>
);

export default ImpactTypeView;
