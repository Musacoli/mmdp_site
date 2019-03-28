import React from 'react';
import Templates from '../../Templates';
import BeneficiaryTypeDropdown from '../../../containers/DropDowns/BeneficiaryType/index';

const BeneficiaryTypeView = ({ ...props }) => (
  <Templates {...props} title="Edit beneficiary type dropdown">
    <BeneficiaryTypeDropdown {...props} />
  </Templates>
);

export default BeneficiaryTypeView;
